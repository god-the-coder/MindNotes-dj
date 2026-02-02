from django.urls import path
from . import views



urlpatterns = [
    path('notes/', views.notesView.as_view() ,name='notes-list'),
    path('notes/<int:pk>', views.notesDetailView.as_view() ,name='notes-detail'),
] 