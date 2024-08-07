from django.db import models
from django.conf import settings
from typing import Any
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.models import User

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(default="")
    createdAt = models.DateTimeField(auto_now_add=True)
    isDone = models.BooleanField(null=False, default=False)
    user = models.ForeignKey(
        User,
        on_delete=models.DO_NOTHING,
        )
    
    def __str__(self):
        return self.name + " - " + self.user.email
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
    
    def create(self, name, description, user):
        self.name = name
        self.description = description
        self.user =  user
        return self
    
    def get_task(self, user):
        return Task.objects.filter(user=user)
    
    def create_task(self):
        self.save()
    
    def update_task(self, name, description):
        self.name = name
        self.description = description
        self.save()
        
    def delete_task(self):
        self.delete()
