from django.contrib import admin
from .models import TagModel, NotesModel, Profile

# Register your models here.
admin.site.register(TagModel)
admin.site.register(NotesModel)
admin.site.register(Profile)
