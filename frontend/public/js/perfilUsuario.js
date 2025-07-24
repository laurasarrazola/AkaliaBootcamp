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
