from django.db import models
from django.conf import settings

class Article(models.Model):
    title = models.CharField(max_length = 255)
    body = models.TextField()
    image = models.ImageField(upload_to='articles/')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return self.title