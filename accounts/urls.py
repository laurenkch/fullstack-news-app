from django.urls import path, include

from .views import ProfileListAPIView

urlpatterns=[
    path('profiles/', ProfileListAPIView.as_view()),

]

