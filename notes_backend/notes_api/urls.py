from django.urls import path
from . import views

urlpatterns = [
    path("", views.CreateListNoteView.as_view(), name="notes"),
    path("detail/<int:id>/", views.RetrieveUpdateDestroyNoteView.as_view(), name="note")
    
]