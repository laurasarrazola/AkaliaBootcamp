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