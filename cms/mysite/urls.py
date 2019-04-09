# -*- coding: utf-8 -*-
from __future__ import absolute_import, print_function, unicode_literals

from cms.sitemaps import CMSSitemap
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.static import serve

from . import views
from django.contrib.auth.views import logout
from django.views.generic.base import TemplateView

admin.autodiscover()

urlpatterns = [
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': {'cmspages': CMSSitemap}}),

    #url('polls/', include('polls.urls')),
    url('admin/', admin.site.urls),
    url('about/', views.current_datetime),
    url('^registration/', include('django.contrib.auth.urls')),
    url('^accounts/', include('django.contrib.auth.urls')),

    url(r'^logout/$', logout, {'next_page': settings.LOGOUT_REDIRECT_URL}, name='logout'),

        #url('', TemplateView.as_view(template_name='home.html'), name='home'),

        #url('panel', views.index), # template/polls
        #url(r'^piazza/', views.page, name='page'), # template
        #url(r'^moodle/', views.page2, name='page2'), # template
        #url(r'^corretor/', views.page3, name='page3'), # template


    url('teste/', views.teste, name='teste'),
    url('send/', views.send, name='send'),

    #url(r'^polls/', include('polls.urls', namespace='polls')), # Polls antigos: para ver, ativar também 'polls' em INSTALLED_APPS (settings.py)
]

urlpatterns += i18n_patterns(
    url(r'^admin/', include(admin.site.urls)),  # NOQA
    url(r'^', include('cms.urls')),
)

# This is only needed when using runserver.
if settings.DEBUG:
    urlpatterns = [
        url(r'^media/(?P<path>.*)$', serve,
            {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
        ] + staticfiles_urlpatterns() + urlpatterns
