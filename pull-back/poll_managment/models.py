from django.db import models
from model_utils.models import TimeStampedModel, SoftDeletableModel

# Create your models here.
class Poll(models.Model):
    question 				= models.CharField(max_length=500)
    cant_options 			= models.IntegerField()
    total_participants 		= models.IntegerField()

    def __str__(self):
	    return self.question

class Option(models.Model):
    name=    models.CharField(max_length=200)
    poll = models.ForeignKey(Poll, on_delete = models.CASCADE)
    cant_marks= models.IntegerField()

