from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, LoginSerializer,ChangePasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import UserProfile

from rest_framework.parsers import MultiPartParser, FormParser



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

        
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        return Response(serializer.data, status=status.HTTP_200_OK)


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