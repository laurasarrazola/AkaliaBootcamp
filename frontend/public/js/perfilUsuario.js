//funcionalidad editar usuario
// public/js/perfilUsuario.js
document.addEventListener("DOMContentLoaded", () => {
  const btnEditar = document.getElementById("btnEditarPerfil");

  if (btnEditar) {
    btnEditar.addEventListener("click", () => {
      const idUsuario = btnEditar.getAttribute("data-id");
      if (idUsuario) {
        window.location.href = `/usuario-editar-perfil/${idUsuario}`;
      } else {
        console.error("ID de usuario no encontrado en el botón.");
      }
    });
  }
});

//funcionalidad elimianr cuenta
document.addEventListener("DOMContentLoaded", () => {
  const btnEliminar = document.getElementById("btnEliminarCuenta");

  if (btnEliminar) {
    btnEliminar.addEventListener("click", async () => {
      const idUsuario = btnEliminar.getAttribute("data-id");

      if (!idUsuario) {
        console.error("No se encontró el ID del usuario para eliminar.");
        return;
      }

      const confirmacion = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");

      if (!confirmacion) return;

      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${idUsuario}`, {
          method: "DELETE"
        });

        if (response.ok) {
          alert("Tu cuenta ha sido eliminada.");
          window.location.href = "/";
        } else {
          const data = await response.json();
          alert("Error al eliminar la cuenta: " + data.error || data.mensaje);
        }
      } catch (error) {
        console.error("Error en la petición de eliminación:", error);
        alert("Error de conexión al servidor");
      }
    });
  }
});

