from django.db import models
from django.conf import settings

class Article(models.Model):
    title = models.CharField(max_length = 255)
    body = models.TextField()
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)

    DRAFT = 'Draft'
    SUBMITTED = 'Submitted'
    REJECTED = 'Rejected'
    PUBLISHED = 'Published'
    ARCHIVED = 'Archived'

    PHASE_CHOICES = [ 
        (DRAFT, 'Draft'),
        (SUBMITTED, 'Submitted'),
        (REJECTED, 'Rejected'),
        (PUBLISHED, 'Published'),
        (ARCHIVED, 'Archived'),
    ]

    phase = models.CharField(max_length=255, choices=PHASE_CHOICES,
                             default=DRAFT)

    def __str__(self):
        return self.title