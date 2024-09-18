from .serializers import Noteserializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Note
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.

# class that creates a new note for the logged in user and list all notes created by that user
class CreateListNoteView(ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = Noteserializer
    permission_classes = (IsAuthenticated,)
    
    def perform_create(self, serializer):
        return serializer.save(created_by=self.request.user)
    
    def get_queryset(self):
        return Note.objects.filter(created_by=self.request.user)
    
# class to retrieve, edit and delete a note by the logged in user
class RetrieveUpdateDestroyNoteView(RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    queryset = Note.objects.all()
    serializer_class = Noteserializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return Note.objects.filter(created_by=self.request.user)
