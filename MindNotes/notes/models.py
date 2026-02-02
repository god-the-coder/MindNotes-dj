from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class TagModel(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class NotesModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.CharField()
    title = models.CharField(max_length=100)
    tags = models.ManyToManyField(TagModel,blank=True,related_name='tags')
    date_time = models.DateTimeField(default=timezone.now)
    updated_time = models.DateTimeField(auto_now= True)
    # pf = models.ImageField(upload_to='files/',blank=True, null=True)


    def __str__(self):
        return self.title
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='profiles/', blank=True, null=True)    
    




