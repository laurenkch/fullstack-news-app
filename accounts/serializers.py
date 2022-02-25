from rest_framework import serializers
from .models import Profile
from rest_auth.serializers import UserDetailsSerializer, TokenSerializer
from rest_auth.models import TokenModel


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'avatar', 'user')


class UserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('is_superuser',)


class TokenSerializer(TokenSerializer):
    is_superuser = serializers.ReadOnlyField(source='user.is_superuser',)

    class Meta(TokenSerializer.Meta):

        fields = TokenSerializer.Meta.fields + ('is_superuser',)
