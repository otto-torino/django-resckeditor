import importlib
import json

from django.http import JsonResponse, HttpResponse
from django.http.response import Http404
from django.utils.translation import gettext_lazy as _
from django.conf import settings


def is_allowed(res):
    """ Check if the given module is defined in the configuration object
        Since this app auto imports such module, better be sure only configured
        modules can be loaded
    """
    resources = settings.RESCKEDITOR_CONFIG.get('RESOURCES', [])
    for r in resources:
        if (r.get('list', None) == res or r.get('output', None) == res):
            return True
    return False


def resources(request):
    """ Lists available resources if module is not given
        otherwise returns resources list and options
    """
    res = request.GET.get('res', None)
    if res:
        if is_allowed(res):
            parts = res.split('.')
            module = importlib.import_module('.'.join(parts[:-1]))
            data = getattr(module, parts[-1])()
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
            raise Exception(_('resckeditor, resource not recognized'))
    else:
        try:
            RESOURCES = settings.RESCKEDITOR_CONFIG.get('RESOURCES', [])
        except AttributeError:
            RESOURCES = []
        data = {
            'resources': RESOURCES,
        }
    return JsonResponse(data)


def resource_output(request):
    """ App view output """
    res = request.GET.get('res', None)
    id = request.GET.get('id', None)
    if not is_allowed(res) or not id:
        raise Http404()

    options = request.GET.get('opt', None)

    try:
        parts = res.split('.')
        module = importlib.import_module('.'.join(parts[:-1]))
        html = getattr(module, parts[-1])(id, json.loads(options))
    except AttributeError:
        html = ''

    return HttpResponse(html)
