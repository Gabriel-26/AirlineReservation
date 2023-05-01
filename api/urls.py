from django.urls import path
from .import views
from api.views import RegisteredUser


urlpatterns = [
    path('api/show', RegisteredUser.as_view()),
]