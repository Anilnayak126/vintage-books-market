from functools import lru_cache

import boto3
from botocore.config import Config
from django.conf import settings


def object_storage_enabled():
    return bool(getattr(settings, 'OBJECT_STORAGE_ENABLED', False))


def get_file_key(file_field):
    if not file_field:
        return ''

    return getattr(file_field, 'name', '') or ''


def _build_s3_client(endpoint_url):
    return boto3.client(
        's3',
        aws_access_key_id=settings.OBJECT_STORAGE_ACCESS_KEY,
        aws_secret_access_key=settings.OBJECT_STORAGE_SECRET_KEY,
        region_name=settings.OBJECT_STORAGE_REGION_NAME,
        endpoint_url=endpoint_url,
        verify=settings.OBJECT_STORAGE_VERIFY_SSL,
        config=Config(
            signature_version='s3v4',
            s3={'addressing_style': settings.OBJECT_STORAGE_ADDRESSING_STYLE},
        ),
    )


@lru_cache(maxsize=1)
def get_internal_s3_client():
    return _build_s3_client(settings.OBJECT_STORAGE_ENDPOINT_URL)


@lru_cache(maxsize=1)
def get_public_s3_client():
    return _build_s3_client(settings.OBJECT_STORAGE_PUBLIC_ENDPOINT_URL)


def generate_presigned_file_url(key):
    if not key:
        return None

    if not object_storage_enabled():
        return None

    return get_public_s3_client().generate_presigned_url(
        ClientMethod='get_object',
        Params={
            'Bucket': settings.OBJECT_STORAGE_BUCKET_NAME,
            'Key': key,
        },
        ExpiresIn=settings.OBJECT_STORAGE_PRESIGNED_EXPIRY,
    )


def build_file_url(file_field, request=None):
    key = get_file_key(file_field)
    if not key:
        return None

    if object_storage_enabled():
        return generate_presigned_file_url(key)

    url = getattr(file_field, 'url', None)
    if not url:
        return None

    if request is not None:
        return request.build_absolute_uri(url)

    return url
