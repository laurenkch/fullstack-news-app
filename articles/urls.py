from django.urls import path, include

from .views import PublishedArticleListAPIView, AllArticlesView, AuthorArticleListView, AuthorEditView, AdminDetailView

app_name= 'articles'

urlpatterns =[
    path('', PublishedArticleListAPIView.as_view()),
    path('all/', AllArticlesView.as_view()),
    path('user/', AuthorArticleListView.as_view()),
    path('edit/<int:pk>/', AuthorEditView.as_view()),
    path('<int:pk>/', AdminDetailView.as_view(), name='article_detail'),
]