from rest_framework import generics

from .models import CustomUser, Profile
from .serializers import ProfileSerializer, UserDetailsSerializer
from rest_framework.decorators import api_view;
from rest_framework.response import Response;

class ProfileListAPIView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
