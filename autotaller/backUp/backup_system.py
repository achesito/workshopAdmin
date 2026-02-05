import subprocess
import os
from datetime import datetime, timedelta
from django.conf import settings
import shutil

print("ARCHIVO",  __file__)

def rotate_backups():
    retention_days = getattr(settings, "BACKUP_RETENTION_DAYS", 7)
    cutoff_date = datetime.now() - timedelta(days=retention_days)
        
    for folder in settings.BACKUP_ROOT.iterdir():
        if not folder.is_dir():
            continue
            
        try:
            folder_date = datetime.strptime(folder.name, "%Y%m%d_%H%M%S")
        except ValueError:
            continue
        if folder_date < cutoff_date:
            shutil.rmtree(folder)
    
    
def create():
    db = settings.DATABASES["default"]
    backup_dir = settings.BACKUP_ROOT
    backup_dir.mkdir(parents=True, exist_ok=True)

    db_file = backup_dir / "database.dump"

    env = os.environ.copy()
    env["PGPASSWORD"] = db["PASSWORD"]

    command = [
        settings.PG_DUMP_PATH,
        "-Fc",
        "-h", db["HOST"],
        "-p", str(db["PORT"]),
        "-U", db["USER"],
        "-f", str(db_file),
        db["NAME"],
    ]

    result = subprocess.run(
        command,
        env=env,
        capture_output=True,
        text=True
    )
    if db_file.exists():
        print("SIZE:", db_file.stat().st_size)
        
    rotate_backups()
    
def backup_today():
    today = datetime.now().strftime("%Y%m%d")

    for folder in settings.BACKUP_ROOT.iterdir():
        if not folder.is_dir():
            continue
        if folder.name.startswith(today):
            return True

    return False

def backup_exist():
    if backup_today():
        return 
    create()
