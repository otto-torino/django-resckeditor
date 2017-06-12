# django-resckeditor

This is a djaingo app which provides and infrastructure you can use to serve custom contents of other apps directly inside ckeditor.

It requires [django-ckeditor](https://github.com/django-ckeditor/django-ckeditor) or a similar ckeditor app, and is implemented for CKEDITOR v >= 4.x.

It defines a custom CKEDITOR plugin which implements two dialog tabs: the first to select the resource (app and view), and the second to dynamically set options.

## Getting Started

Add resckeditor to your installed apps:

    INSTALLED_APPS = (
        # ...
        'ckeditor',
        'ckeditor_uploader',
        'resckeditor',
        # ...
    )

add the urls in your core application:

    urlpatterns = [
        # ...
        url(r'^resckeditor/', include('baton.urls')),
    ]

**N.B.** do not change the **resckeditor** path, since it is hardcoded in the js code.

Define which applications export resources for ckeditor, so for example in your settings:

    RESCKEDITOR_CONFIG = {
        'APPS': [
            {'name': 'my-app', 'label': 'My Application'},
            {'name': 'news', 'label': 'News'},
        ]
    }

Then every application which exports resources must have a __ckeditor.py__ module and define two functions:

**ckeditor_resources**

this function should return  a dictionary with the allowed resources (id and label), and a list of options objects, i.e:

    def ckeditor_resources():
        res = []
        for g in Gallery.objects.published():
            res.append({
                'label': g.name,
                'id': g.id
            })
        return {
            'resources': res,
            'options': [
                {
                    'type': 'checkbox',
                    'name': 'media-gallery-dialog-options-show-title',
                    'label': 'Show title',
                    'default': True
                },
                {
                    'type': 'text',
                    'name': 'media-gallery-dialog-options-num-images',
                    'label': 'Images number',
                    'default': 4
                },
                {
                    'type': 'select',
                    'name': 'media-gallery-dialog-options-layout',
                    'label': 'Layout',
                    'data': [
                        {'label': 'one row', 'value': 'row'},
                        {'label': 'two columns', 'value': 'col-2'},
                        {'label': 'three columns', 'value': 'col-3'},
                        {'label': 'four columns', 'value': 'col-4'},
                    ]
                }
            ]

        }

**ckeditor_resource_html(id)**

this function should return the output of the given resource identified by its id, ie:

    def ckeditor_resource_html(id):
        g = Gallery.objects.get(pk=id)
        return mark_safe(g.name)

## Supported options

Currently only 3 types of options are supported: checkbox, text and select, but should be sufficient for almost all use cases.
The syntax and required properties are the one you may se in the example above.
