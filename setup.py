import os
from setuptools import setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='django-resckeditor',
    version='1.0.0',
    packages=['resckeditor', ],
    include_package_data=True,
    license='MIT License',
    description='A django app which provides and infrastructure you can use to include custom contents of other apps directly inside ckeditor.',
    long_description=README,
    url='http://github.com/otto-torino/django-resckeditor',
    author='abidibo',
    author_email='abidibo@gmail.com',
    install_requires=[
        'django-ckeditor'
    ],
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.5',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.2',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.5',
        'Topic :: Software Development',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
    ]
)
