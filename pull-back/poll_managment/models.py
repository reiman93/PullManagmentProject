from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Poll(models.Model):
    question 				= models.CharField(max_length=500)
    cant_options 			= models.IntegerField()
    user_id          		= models.ForeignKey(User, on_delete = models.CASCADE)
    total_participants 		= models.IntegerField()

    def __str__(self):
	    return self.question

class Option(models.Model):
    name=    models.CharField(max_length=200)
    poll = models.ForeignKey(Poll, on_delete = models.CASCADE)
    cant_marks= models.IntegerField()

