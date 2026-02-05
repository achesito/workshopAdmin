from .settings import *
import shutil

EMAIL_KEY = "your api key"
SENDER_EMAIL = "your registered mail"
SENDER_NAME = "name you set for this sender at bravo"

SECRET_KEY = 'generate one with: python -c "from django.core.management.utils import get_random_secret_key; get_random_secret_key()"'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'your dbname',
        'USER' : 'your user',
        'PASSWORD' : 'your password',
        'HOST': 'localhost',
        'PORT' : '5432',
    }
}