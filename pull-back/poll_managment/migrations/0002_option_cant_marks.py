# Generated by Django 4.0.5 on 2022-09-24 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poll_managment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='cant_marks',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
