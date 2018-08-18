import sys, os
cwd = os.getcwd()
sys.path.append(cwd)
INTERP = "/opt/conda/bin/python"
if sys.executable != INTERP: os.execl(INTERP, INTERP, *sys.argv)
os.environ['DJANGO_SETTINGS_MODULE'] = "restapi.settings"
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()