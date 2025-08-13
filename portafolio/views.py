from django.shortcuts import render

def inicio(request):
    """Vista para la página de inicio"""
    context = {
        'nombre': 'Laura Sarrazola',
        'ocupacion': 'Estudiante apasionada de análisis y desarrollo de software'
    }
    return render(request, 'portafolio/inicio.html', context)

def proyectos(request):
    """Vista para la página de proyectos"""
    proyectos_data = [
        {
            'nombre': 'Akalia',
            'descripcion': 'Una plataforma para facilitar la visualización y venta de productos artesanales',
            'repositorio': '@laurasarrazola/AkaliaBootcamp',
            'tecnologias': ['Node.js', 'Express.js', 'MySQL', 'Bootstrap', 'EJS']
        }
    ]
    context = {
        'proyectos': proyectos_data
    }
    return render(request, 'portafolio/proyectos.html', context)

def contacto(request):
    """Vista para la página de contacto"""
    context = {
        'nombre': 'Laura Sarrazola',
        'email': 'lausa8a@gmail.com',
        'telefono': '3013983587',
        'ciudad': 'Envigado'
    }
    return render(request, 'portafolio/contacto.html', context)

def sobre_mi(request):
    """Vista para la página sobre mí"""
    context = {
        'nombre': 'Laura Sarrazola',
        'edad': 28,
        'descripcion': 'Una chica de 28 años, amante de los gatos y apasionada por la academia, con estudios previos de ingeniería. Vive en Envigado con su familia.',
        'gustos_musicales': ['Pink Floyd', 'Tame Impala', 'Mon Laferte'],
        'hobbies': ['Academia', 'Música', 'Gatos', 'Ingeniería']
    }
    return render(request, 'portafolio/sobre_mi.html', context)
