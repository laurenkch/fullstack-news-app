from django.urls import path, include

from .views import PublishedArticleListAPIView, AllArticlesView, AuthorArticleListView, AuthorEditView, AdminDetailView, PublishedDetailView

app_name= 'articles'

urlpatterns =[
    path('', PublishedArticleListAPIView.as_view()),
    path('<int:pk>/', PublishedDetailView.as_view()),
    path('all/', AllArticlesView.as_view()),
    path('author/', AuthorArticleListView.as_view()),
    path('edit/<int:pk>/', AuthorEditView.as_view()),
    path('admin/<int:pk>/', AdminDetailView.as_view(), name='article_detail'),
]