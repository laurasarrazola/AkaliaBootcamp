function showProductDetail(id) {
    window.location.href = `/productos/${id}`;
}

function showListProducts() {
    window.location.href = `/productos`;
}


function showUserProductDetail(idUsuario,idProducto) {
    window.location.href = `/productos/usuario-productos/${idUsuario}/detalle/${idProducto}`;
}

function editUserProductDetail(idUsuario,idProducto) {
  console.log(idUsuario)
    window.location.href = `/productos/usuario-productos/${idUsuario}/editar/${idProducto}`;
}

//funcionalidad agregar producto
function addNewProduct(idUsuario) {
    window.location.href = `/productos/usuario-productos/${idUsuario}/crear`;
}

//funcionalidad elimianr producto
async function deleteProducto(user, product) {

    const idUsuario = user;
    const idProducto = product;

    console.log(idProducto, idUsuario)
    if (!idProducto) {
        console.error("No se encontró el ID del producto para eliminar.");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas eliminar el producto? Esta acción no se puede deshacer.");

    if (!confirmacion) return;

    try {
        const response = await fetch(`http://localhost:3000/api/productos/${idProducto}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("El producto ha sido eliminado con éxito.");
            window.location.href = `/productos/usuario-productos/${idUsuario}`;
        } else {
            const data = await response.json();
            alert("Error al eliminar la cuenta: " + data.error || data.mensaje);
        }
    } catch (error) {
        console.error("Error en la petición de eliminación:", error);
        alert("Error de conexión al servidor");
    };

 }


// Inicializar el carrusel
var splide = new Splide('#main-carousel', {
  type: 'slide',
  perPage:1,
  start:0,
  pagination: false,
  focus: 'center',
});

var thumbnails = document.getElementsByClassName('thumbnail');
var current;
var totalSlides = thumbnails.length;

// Agrega eventos a miniaturas
for (var i = 0; i < thumbnails.length; i++) {
  (function (index) {
    thumbnails[index].addEventListener('click', function () {
      const slides = splide.Components.Slides.get();
      for (let i = 0; i < slides.length; i++) {
        if (slides[i].index === index) {
          splide.go(i);
          break;
        }
      }
    });
  })(i);
}

// Sincronizar la clase activa en miniaturas
splide.on('mounted move', function () {
  var realIndex = splide.index % totalSlides;
  var thumbnail = thumbnails[realIndex];

  if (thumbnail) {
    if (current) current.classList.remove('is-active');
    thumbnail.classList.add('is-active');
    current = thumbnail;
  }
});

splide.mount();


