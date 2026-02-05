#clase registroUsuario la cual hereda de persona
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from .person import Person

class UserManager(BaseUserManager):
    def create_user(self, User, password=None, **extra_fields):
        if not User:
            raise Exception("id card must be mandatory")
        user = self.model(userName=User, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, userName, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if not extra_fields.get('is_staff'):
            raise ValueError('superuser must have is_staff=True')
        if not extra_fields.get('is_superuser'):
            raise ValueError('superuser must have is_superuser=True')

        return self.create_user(userName, password, **extra_fields)


class RegisterUser(Person, AbstractBaseUser):
    userName = models.CharField(max_length=20, blank=False, null=False, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'userName'
    REQUIRED_FIELDS = ['name','id_card', 'mail']