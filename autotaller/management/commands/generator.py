from django.core.management.base import BaseCommand
from autotaller.backUp.backup_system import backup_exist

class Command(BaseCommand):
    def handle(self, *args, **options):
        backup_exist