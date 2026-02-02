from rest_framework import serializers
from notes.models import NotesModel

class NotesSerializers(serializers.ModelSerializer):
    class Meta:
        model = NotesModel
        fields = ["id", "title", "notes", "date_time", 'updated_time', 'tags']
        read_only_fields = ["id", "date_time"]


