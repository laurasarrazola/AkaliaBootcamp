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
            <li><a class="dropdown-item" href="/usuario-emprendimientos/${data.idPersona}">Mis emprendimientos</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28" fill="none">
          <mask id="mask0_168_49" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
            <rect width="28" height="28" fill="currentColor" />
          </mask>
          <g mask="url(#mask0_168_49)">
            <path
              d="M14 14.25C13.6694 14.25 13.3924 14.1382 13.1688 13.9146C12.9451 13.691 12.8333 13.4139 12.8333 13.0834V3.75004C12.8333 3.41949 12.9451 3.1424 13.1688 2.91879C13.3924 2.69518 13.6694 2.58337 14 2.58337C14.3306 2.58337 14.6076 2.69518 14.8313 2.91879C15.0549 3.1424 15.1667 3.41949 15.1667 3.75004V13.0834C15.1667 13.4139 15.0549 13.691 14.8313 13.9146C14.6076 14.1382 14.3306 14.25 14 14.25ZM14 24.75C12.5417 24.75 11.1757 24.473 9.90208 23.9188C8.62847 23.3646 7.52014 22.616 6.57708 21.673C5.63403 20.7299 4.88542 19.6216 4.33125 18.348C3.77708 17.0743 3.5 15.7084 3.5 14.25C3.5 13.0639 3.69444 11.9118 4.08333 10.7938C4.47222 9.67574 5.03611 8.65004 5.775 7.71671C5.98889 7.44449 6.26111 7.31324 6.59167 7.32296C6.92222 7.33268 7.21389 7.46393 7.46667 7.71671C7.68056 7.9306 7.77778 8.1931 7.75833 8.50421C7.73889 8.81532 7.63194 9.10699 7.4375 9.37921C6.9125 10.0792 6.51389 10.8473 6.24167 11.6834C5.96944 12.5195 5.83333 13.375 5.83333 14.25C5.83333 16.525 6.62569 18.4549 8.21042 20.0396C9.79514 21.6243 11.725 22.4167 14 22.4167C16.275 22.4167 18.2049 21.6243 19.7896 20.0396C21.3743 18.4549 22.1667 16.525 22.1667 14.25C22.1667 13.3556 22.0354 12.4855 21.7729 11.6396C21.5104 10.7938 21.0972 10.0209 20.5333 9.32087C20.3389 9.0681 20.2319 8.79101 20.2125 8.48962C20.1931 8.18824 20.2903 7.9306 20.5042 7.71671C20.7375 7.48337 21.0194 7.36185 21.35 7.35212C21.6806 7.3424 21.9528 7.46393 22.1667 7.71671C22.925 8.65004 23.5035 9.67087 23.9021 10.7792C24.3007 11.8875 24.5 13.0445 24.5 14.25C24.5 15.7084 24.2229 17.0743 23.6687 18.348C23.1146 19.6216 22.366 20.7299 21.4229 21.673C20.4799 22.616 19.3715 23.3646 18.0979 23.9188C16.8243 24.473 15.4583 24.75 14 24.75Z"
              fill="currentColor" />
          </g>
        </svg> Cerrar sesión</a></li>
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
