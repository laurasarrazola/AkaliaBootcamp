//editar emprendimiento
const formEditar = document.getElementById("form-editar-emprendimiento");
if (formEditar) {
  formEditar.addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("idEmprendimiento").value;
    const idPersona = document.getElementById("idPersona").value;
    const fechaRegistro = document.getElementById("fechaRegistro").value;
    const nombreEmprendimiento = document.getElementById("nombreEmprendimiento").value;
    const imagenLogo = document.getElementById("imagenLogo").value;
    const descripcionNegocio = document.getElementById("descripcionNegocio").value;

    try {
      const response = await fetch(`http://localhost:3000/api/emprendimientos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idPersona,
          nombreEmprendimiento,
          imagenLogo,
          fechaRegistro,
          descripcionNegocio
        })
      });

      if (response.ok) {
        // Redirige después de actualizar
        window.location.href = `/usuario-emprendimientos/${idPersona}`;
      } else {
        const data = await response.json();
        alert("Error al actualizar: " + (data.error || data.mensaje));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red al intentar actualizar");
    }
  });
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

document.addEventListener("DOMContentLoaded", () => {
  const botonesEliminar = document.querySelectorAll(".btnEliminarEmprendimiento");
  console.log("Botones eliminar encontrados:", botonesEliminar.length);

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async (e) => {
      e.preventDefault();
      const idEmprendimiento = boton.getAttribute("data-id");
      console.log("Click en eliminar:", idEmprendimiento);

      if (!idEmprendimiento) {
        alert("ID de emprendimiento no encontrado.");
        return;
      }

      const confirmar = confirm("¿Estás seguro de eliminar este emprendimiento?");
      if (!confirmar) return;

      try {
        const respuesta = await fetch(`/usuario-eliminar-emprendimiento/${idEmprendimiento}`, {
          method: "DELETE"
        });

        if (respuesta.ok) {
          alert("Emprendimiento eliminado correctamente.");
          const articulo = boton.closest("article");
          if (articulo) articulo.remove();
        } else {
          const errorData = await respuesta.text();
          alert("No se pudo eliminar el emprendimiento: " + errorData);
        }
      } catch (error) {
        console.error("Error al eliminar el emprendimiento:", error);
        alert("Ocurrió un error.");
      }
    });
  });
});

