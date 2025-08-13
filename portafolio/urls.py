from django.urls import path
from . import views

app_name = 'portafolio'

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('proyectos/', views.proyectos, name='proyectos'),
    path('contacto/', views.contacto, name='contacto'),
    path('sobre-mi/', views.sobre_mi, name='sobre_mi'),
]