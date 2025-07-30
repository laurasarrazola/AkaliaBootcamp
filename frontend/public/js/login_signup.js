document.addEventListener('DOMContentLoaded', () => {
  const toggleLoginPwd = document.getElementById('toggleLoginPwd');
  const loginPwd = document.getElementById('loginPwd');

  toggleLoginPwd.addEventListener('click', () => {
    loginPwd.type = loginPwd.type === 'password' ? 'text' : 'password';
    toggleLoginPwd.innerHTML = loginPwd.type === 'password' ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
  });

  const toggleRegisterPwd = document.getElementById('toggleRegisterPwd');
  const registerPwd = document.getElementById('registerPwd');

  toggleRegisterPwd.addEventListener('click', () => {
    registerPwd.type = registerPwd.type === 'password' ? 'text' : 'password';
    toggleRegisterPwd.innerHTML = registerPwd.type === 'password' ? '<i class="fa fa-eye"></i>' : '<i class="fa fa-eye-slash"></i>';
  });
});

/* Funcionalidad de redirección al iniciar sesión con credenciales correctas */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = loginForm.email.value;
      const contrasena = loginForm.contrasena.value;

      await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasena })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Error en la respuesta del servidor');
          }

          return res.json()
        })
        .then(data => {
          if (data.error) {
            console.error('Error en la respuesta:', data.error);
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
          } else {
            console.log('Inicio de sesión exitoso:', data);
            localStorage.setItem('usuario', JSON.stringify(data));
            window.location.href = `/usuario-perfil/${data.idPersona}`;
          }
        }).catch(error => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
        });
    });
  }
});


// FUNCION NAVBAR SEGÚN USUARIO
  document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    const soloVisitante = document.querySelectorAll(".solo-visitante");
    const soloUsuario = document.querySelectorAll(".solo-usuario");

    if (usuario) {
      soloVisitante.forEach(el => el.classList.add("d-none"));
      soloUsuario.forEach(el => el.classList.remove("d-none","nav-protegida"));

      document.querySelector(".user-name").innerText = `Hola ${usuario.nombreUsuario}` ;
      document.querySelector(".user-profile").href = `/usuario-perfil/${usuario.idPersona}` ;
      document.querySelector(".user-emprendimientos").href = `/usuario-emprendimientos/${usuario.idPersona}` ;

    } else {
      soloVisitante.forEach(el => el.classList.remove("d-none","nav-protegida"));
      soloUsuario.forEach(el => el.classList.add("d-none"));
    }
    
  });

    // LOGOUT

    function logout() {
      localStorage.removeItem("usuario");
      window.location.href = `/`;

    }

