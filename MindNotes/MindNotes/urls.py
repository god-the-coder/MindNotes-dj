from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('notes/', include('notes.urls')),
    path('api/', include('api.urls')),
    path('', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),


    path("__reload__/", include("django_browser_reload.urls")),
] 
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
