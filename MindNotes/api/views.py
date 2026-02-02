
from rest_framework import status
from rest_framework.views import APIView
from notes.models import TagModel, NotesModel
from .serializers import NotesSerializers
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
# Create your views here.

# it will handle get and post
class notesView(APIView):

    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        note = NotesModel.objects.filter(user=request.user).order_by('-updated_time')
        serializer = NotesSerializers(note, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = NotesSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class notesDetailView(APIView):
    def get(self,request,pk):
        note = get_object_or_404(NotesModel,pk=pk)
        serializer = NotesSerializers(note)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self,request,pk):
        note = get_object_or_404(NotesModel,pk=pk)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def patch(self,request,pk):
        note = get_object_or_404(NotesModel,pk=pk)
        serializer = NotesSerializers(note,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    


    
