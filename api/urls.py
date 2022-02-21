from django.urls import include, path

app_name = 'api'

urlpatterns=[
    path('', include('accounts.urls')),
    path('articles/', include('articles.urls', namespace='articles')),
]