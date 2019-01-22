Installation and Configuration
==============================

Installation
------------

1. Install from PyPI::

    pip install django-resckeditor

2. Add ``ckeditor`` and ``resckeditor`` to your ``INSTALLED_APPS``::

    INSTALLED_APPS = (
        # ...
        'ckeditor',
        'resckeditor',
        # ...
    )


Configuration
-------------

Configuring django-resckeditor is quite simple, you just need to define a list of resources made available to the editor.
Each resource should define a function listing all its items (i.e. the news available for insertion, the media galleries ready to be included, ...)
and a function responsible for generating the html output of a single item::

   RESCKEDITOR_CONFIG = {
       'RESOURCES': [
           {
               'list': 'news.ckeditor.resources',
               'output': 'news.ckeditor.resource_output',
               'label': 'News'
           },
       ]
   }

The label is used in the dropdown of the ckeditor plugin dialog window to select the desired resource.
