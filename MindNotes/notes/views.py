from django.shortcuts import render
from .models import NotesModel
from django.contrib.auth.decorators import login_required
# from .forms import 

# Create your views here.
@login_required
def home(request):
    notes = NotesModel.objects.filter(user= request.user).order_by("-date_time")
    return render(request, 'notes/home.html', {'notes':notes})
