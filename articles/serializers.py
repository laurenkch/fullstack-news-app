from rest_framework import serializers

from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    authorname = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Article
        fields = ('author','body', 'authorname', 'created_at', 'id','image','phase','title','updated_at') 


class ArticleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'body', 'image','id','phase')






