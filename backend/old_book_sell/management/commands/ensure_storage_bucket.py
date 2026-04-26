import time

from botocore.exceptions import ClientError, EndpointConnectionError
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from old_book_sell.object_storage import get_internal_s3_client, object_storage_enabled


class Command(BaseCommand):
    help = 'Ensure the configured object storage bucket exists.'

    def handle(self, *args, **options):
        if not object_storage_enabled():
            self.stdout.write(self.style.NOTICE('Object storage disabled, skipping bucket bootstrap.'))
            return

        bucket_name = settings.OBJECT_STORAGE_BUCKET_NAME
        client = get_internal_s3_client()

        for attempt in range(1, settings.OBJECT_STORAGE_BOOTSTRAP_RETRIES + 1):
            try:
                client.head_bucket(Bucket=bucket_name)
                self.stdout.write(self.style.SUCCESS(f'Bucket "{bucket_name}" is ready.'))
                return
            except ClientError as exc:
                error_code = str(exc.response.get('Error', {}).get('Code', ''))
                if error_code in {'404', 'NoSuchBucket'}:
                    client.create_bucket(Bucket=bucket_name)
                    self.stdout.write(self.style.SUCCESS(f'Bucket "{bucket_name}" created.'))
                    return
                if attempt == settings.OBJECT_STORAGE_BOOTSTRAP_RETRIES:
                    raise CommandError(
                        f'Could not verify bucket "{bucket_name}" after {attempt} attempts: {exc}'
                    ) from exc
            except EndpointConnectionError as exc:
                if attempt == settings.OBJECT_STORAGE_BOOTSTRAP_RETRIES:
                    raise CommandError(
                        f'Could not connect to object storage after {attempt} attempts: {exc}'
                    ) from exc

            time.sleep(settings.OBJECT_STORAGE_BOOTSTRAP_DELAY)
