Configuration
===============

You can configure resckeditor defining a config dictionary in your ``settings.py``

Example
-------

This is an example of configuration::

   RESCKEDITOR_CONFIG = {
       'RESOURCES': [
           {
               'list': 'news.ckeditor.resources',
               'output': 'news.ckeditor.resource_output',
               'label': 'News'
           },
       ]
   }

You can define a set of resources. Each resource defines a `list` function called to retrieve all the available items and an
`output` function, called to retrieve the actual content to be inserted in the editor.
The `label` is used to in the dropdown of the ckeditor plugin dialog window to select the desired resource.
