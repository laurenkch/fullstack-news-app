from django.urls import path, include

from .views import ArticleDetailAPIView, ArticleListAPIView;

app_name= 'articles'

urlpatterns =[
    path('', ArticleListAPIView.as_view()),
    path('<int:pk>/', ArticleDetailAPIView.as_view(), name='article_detail'),
]