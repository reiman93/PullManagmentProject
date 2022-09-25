from django.contrib import admin
from .models import Poll
from .models import Option


# Register your models here.
admin.site.register(Poll)
admin.site.register(Option)
