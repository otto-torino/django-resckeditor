from django.conf.urls import url
from .views import resource_ckeditor, resource_ckeditor_html

urlpatterns = [
    url(r'^$', resource_ckeditor, name='resckeditor-dialog-data'),
    url(r'^html/$', resource_ckeditor_html, name='resckeditor-html'),
]
