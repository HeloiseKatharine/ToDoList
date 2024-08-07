from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenBlacklistView, TokenRefreshView
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("user/", views.user, name="user"),
    path('get-all-users/', views.getAllUsers, name='get_all_users'),
    path("user/<str:username>", views.getUserByEmailOrUsername, name="getUserByEmailOrUsername"),
    path("user/login/", TokenObtainPairView.as_view(), name="login"),
    path("user/login/refresh", TokenRefreshView.as_view()),
    path("user/logout", TokenBlacklistView.as_view()),
    path("task", views.tasks, name="task"),
    path("task/<int:task_id>/", views.delete_task, name="delete_task"),
]
