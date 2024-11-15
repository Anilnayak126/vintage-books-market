from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, LoginSerializer, ChangePasswordSerializer,EditUserProfileSerializer
from .models import UserProfile, CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

# Register View
class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user_data = request.data.copy()
        
        profile_image = request.FILES.get('profile_image')
        user_data['profile_image'] = profile_image

        serializer = UserSerializer(data=user_data)

        if serializer.is_valid():
            user = serializer.save()

            UserProfile.objects.create(
                user=user,
                phone_number=user_data.get('phone_number', ''),
                address=user_data.get('address', ''),
                profile_image=profile_image
            )
            
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)  
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        response_data = {
            "user": serializer.data,
            "access": access_token,
            "refresh": refresh_token
        }

        
        
        return Response(response_data, status=status.HTTP_200_OK)
    
# Change Password View
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()

            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Logout View (Handle token invalidation)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"detail": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def patch(self, request):
        user = request.user
        user_data = {}

        user_data['first_name'] = request.data.get('first_name', user.first_name)
        user_data['last_name'] = request.data.get('last_name', user.last_name)
        user_data['email'] = request.data.get('email', user.email)

       
        profile_image = request.FILES.get('profile_image')
        if profile_image:
            user_data['profile_image'] = profile_image

      
        user.first_name = user_data['first_name']
        user.last_name = user_data['last_name']
        user.email = user_data['email']
        user.save()

        profile = user.user_profile  
        profile.phone_number = request.data.get('phone_number', profile.phone_number)
        profile.address = request.data.get('address', profile.address)

        if profile_image:
            profile.profile_image = profile_image
        profile.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)


