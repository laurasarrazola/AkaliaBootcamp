function showEmprendimientoDetail(idUsuario,idEmprendimiento) {
    window.location.href = `/usuario-emprendimientos/${idUsuario}/detalle/${idEmprendimiento}`;
}

//editar emprendimiento

function editUserProductDetail(idUsuario,idEmprendimiento) {
  console.log(idUsuario)
    window.location.href = `/usuario-emprendimientos/${idUsuario}/editar/${idEmprendimiento}`;
}

//agregar emprendimiento
const formNuevo = document.getElementById('formNuevoEmprendimiento');
if (formNuevo) {
  formNuevo.addEventListener('submit', async function (e) {
    e.preventDefault();

    const idPersona = formNuevo.idPersona.value;
    const nombreEmprendimiento = formNuevo.nombreEmprendimiento.value;
    const imagenLogo = formNuevo.imagenLogo.value;
    const descripcionNegocio = formNuevo.descripcionNegocio.value;

    const payload = {
      idPersona,
      nombreEmprendimiento,
      imagenLogo,
      descripcionNegocio,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch('http://localhost:3000/api/emprendimientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error al guardar: ' + (errorData.message || 'Error desconocido'));
        return;
      }

      window.location.href = `/usuario-emprendimientos/${idPersona}`;
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error al enviar los datos del formulario.');
    }
  });
}



//funcionalidad elimianr producto
async function deleteProducto(usuario, emprendimiento) {

    const idUsuario = usuario;
    const idEmprendimiento = emprendimiento;

    console.log(idEmprendimiento, idUsuario)
    if (!idEmprendimiento) {
        console.error("No se encontró el ID del emprendimiento para eliminar.");
        return;
    }

    const confirmacion = confirm("¿Estás seguro de que deseas eliminar el emprendimiento? Esta acción no se puede deshacer.");

    if (!confirmacion) return;

    try {
        const response = await fetch(`/usuario-eliminar-emprendimiento/${idEmprendimiento}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("El emprendimiento ha sido eliminado con éxito.");
            window.location.href = `/usuario-emprendimientos/${idUsuario}`;
        } else {
            const data = await response.json();
            alert("Error al eliminar el emprendimiento: " + data.error || data.mensaje);
        }
    } catch (error) {
        console.error("Error en la petición de eliminación:", error);
        alert("Error de conexión al servidor");
    };

 }

