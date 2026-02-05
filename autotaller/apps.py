from django.apps import AppConfig
from django.conf import settings
import os

class AutotallerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'autotaller'
    
    def ready(self):
        self.createSource()
        if os.environ.get("RUN_MAIN") != "true":
            return
        
        import autotaller.signals
        from autotaller.backUp.backup_system import backup_exist
        backup_exist()
        
    def createSource(self):
        data = [
            settings.MEDIA_ROOT,
            settings.BACKUP_ROOT
        ]
        
        for root in data:
            if root and not os.path.exists(root):
                os.makedirs(root, exist_ok=True)