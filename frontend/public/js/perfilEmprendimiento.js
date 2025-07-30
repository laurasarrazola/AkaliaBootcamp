//editar emprendimiento

function editUserProductDetail(idUsuario,idEmprendimiento) {
  console.log(idUsuario)
    window.location.href = `/usuario-emprendimientos/${idUsuario}/editar/${idEmprendimiento}`;
}

// const formEditar = document.getElementById("form-editar-emprendimiento");
// if (formEditar) {
//   formEditar.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const id = document.getElementById("idEmprendimiento").value;
//     const idPersona = document.getElementById("idPersona").value;
//     const fechaRegistro = document.getElementById("fechaRegistro").value;
//     const nombreEmprendimiento = document.getElementById("nombreEmprendimiento").value;
//     const imagenLogo = document.getElementById("imagenLogo").value;
//     const descripcionNegocio = document.getElementById("descripcionNegocio").value;

//     try {
//       const response = await fetch(`http://localhost:3000/api/emprendimientos/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           idPersona,
//           nombreEmprendimiento,
//           imagenLogo,
//           fechaRegistro,
//           descripcionNegocio
//         })
//       });

//       if (response.ok) {
//        // Redirige después de actualizar
//         window.location.href = `/usuario-emprendimientos/${idPersona}`;
//       } else {
//         const data = await response.json();
//         alert("Error al actualizar: " + (data.error || data.mensaje));
//       }
//     } catch (error) {
//       console.error("Error de red:", error);
//       alert("Error de red al intentar actualizar");
//     }
//   });
// }

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

