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