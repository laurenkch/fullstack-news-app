# Generated by Django 3.2.12 on 2022-02-21 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(null=True, upload_to='profiles/'),
        ),
    ]
