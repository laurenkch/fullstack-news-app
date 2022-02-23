from rest_framework import generics

from .models import Article
from .serializers import ArticleSerializer, ArticleAuthorSerializer

from .permissions import IsAuthor
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly


class PublishedArticleListAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    permission_class = IsAuthenticatedOrReadOnly

    def get_queryset(self):
        """
        filters list to return only published articles.  
        """
        queryset = Article.objects.order_by('-created_at')
        queryset = queryset.filter(phase='Published')
        return queryset

class AllArticlesView(generics.ListAPIView):
    permission_class=(IsAdminUser,)
    '''
    returns all articles for the admin. 
    '''
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
        

class AuthorArticleListView(generics.ListCreateAPIView):
    permission_classes = (IsAuthor,)
    serializer_class = ArticleAuthorSerializer

    def get_queryset(self):
        """
        filters list to return articles by the author
        """
        queryset = Article.objects.order_by('-created_at')
        queryset = queryset.filter(author = self.request.user)
        queryset = queryset.filter(phase='Draft')

        return queryset
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        serializer.save(phase='Draft')


class AuthorEditView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthor,)
    serializer_class = ArticleAuthorSerializer

    def get_queryset(self):
        """
        filters list to return articles by the author, and articles that are in the Draft phase.
        """
        queryset = Article.objects.order_by('-created_at')
        queryset = queryset.filter(author = self.request.user)
        queryset = queryset.filter(phase = 'Draft')
        return queryset


class AdminDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAdminUser,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
