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
document.addEventListener('DOMContentLoaded', () => {
  const navbarUserActions = document.getElementById('navbarUserActions');
  const usuario = localStorage.getItem('usuario');

  if (navbarUserActions) {
    if (usuario) {
      const data = JSON.parse(usuario);
      navbarUserActions.innerHTML = `
        <div class="dropdown text-end">
          <button class="btn  dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="d-flex align-items-center gap-2">
          
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
  <path d="M19.25 10.5C19.25 11.8924 18.6969 13.2277 17.7123 14.2123C16.7277 15.1969 15.3924 15.75 14 15.75C12.6076 15.75 11.2723 15.1969 10.2877 14.2123C9.30312 13.2277 8.75 11.8924 8.75 10.5C8.75 9.10761 9.30312 7.77226 10.2877 6.78769C11.2723 5.80312 12.6076 5.25 14 5.25C15.3924 5.25 16.7277 5.80312 17.7123 6.78769C18.6969 7.77226 19.25 9.10761 19.25 10.5Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 14C0 10.287 1.475 6.72601 4.10051 4.10051C6.72601 1.475 10.287 0 14 0C17.713 0 21.274 1.475 23.8995 4.10051C26.525 6.72601 28 10.287 28 14C28 17.713 26.525 21.274 23.8995 23.8995C21.274 26.525 17.713 28 14 28C10.287 28 6.72601 26.525 4.10051 23.8995C1.475 21.274 0 17.713 0 14ZM14 1.75C11.6931 1.75012 9.43314 2.40163 7.4802 3.62955C5.52727 4.85746 3.96074 6.61187 2.96094 8.69084C1.96113 10.7698 1.56868 13.0888 1.82875 15.381C2.08882 17.6732 2.99084 19.8454 4.431 21.6475C5.6735 19.6455 8.40875 17.5 14 17.5C19.5912 17.5 22.3248 19.6437 23.569 21.6475C25.0092 19.8454 25.9112 17.6732 26.1713 15.381C26.4313 13.0888 26.0389 10.7698 25.0391 8.69084C24.0393 6.61187 22.4727 4.85746 20.5198 3.62955C18.5669 2.40163 16.3069 1.75012 14 1.75Z" fill="currentColor"/>
</svg>

</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li class="ps-3 fw-semibold">Hola ${data.nombreUsuario || 'Usuario'}</li>
            <li><a class="dropdown-item" href="/usuario-perfil/${data.idPersona}">Mi perfil</a></li>
            <li><a class="dropdown-item" href="/emprendimientos">Mis emprendimientos</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Cerrar sesión</a></li>
          </ul>
        </div>
      `;

      // Manejar logout
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('usuario');
          location.href = '/';
        });
      }
    } else {
      navbarUserActions.innerHTML = `
      
        <button class="btn btn-basic text-nowrap" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</button>
        <button class="btn btn-terracota text-nowrap" data-bs-toggle="modal" data-bs-target="#registerModal">Registrarse</button>
      `;
    }
  }
});
