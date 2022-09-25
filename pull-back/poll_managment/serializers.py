from rest_framework import serializers
from rest_framework.serializers import Serializer
from poll_managment.models import Poll, Option
class PollSerializers(serializers.ModelSerializer):
    class Meta:
        model = Poll  
        exclude = []

class OptionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Option  
        exclude = []