from django.conf.urls import url
from .views import resources, resource_output

app_name = 'resckeditor'
urlpatterns = [
    url(r'^$', resources, name='dialog-data'),
    url(r'^output/$', resource_output, name='output'),
]
