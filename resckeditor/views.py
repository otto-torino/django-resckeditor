import importlib
import json
from django.http import JsonResponse, HttpResponse
from django.conf import settings


def resource_ckeditor(request):
    app = request.GET.get('app', None)
    if app:
        module = importlib.import_module(
            '%s.ckeditor' % app)
        data = module.ckeditor_resources()
        res = []
        for r in data.get('resources'):
            res.append({
                'label': r['label'],
                'id': r['id']
            })
        data = {
            'res': res,
            'options': data.get('options')
        }
    else:
        try:
            APPS = settings.RESCKEDITOR_CONFIG.get('APPS', [])
        except:
            APPS = []
        data = {
            'apps': APPS
        }
    return JsonResponse(data)


def resource_ckeditor_html(request):
    app = request.GET.get('app', None)
    id = request.GET.get('id', None)
    options = request.GET.get('opt', None)

    html = ''
    if app and id:
        module = importlib.import_module(
            '%s.ckeditor' % app)
        html = module.ckeditor_resource_html(id, json.loads(options))

    return HttpResponse(html)
