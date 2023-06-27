document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.login-page .login-btn');
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const form = document.forms['loginForm'],
      username = form.username.value,
      password = form.password.value;
    handleLogin(username, password);
  });
});

const handleLogin = async (username, password) => {
  let msg = 'Tên đăng nhập hoặc mật khẩu không chính xác!';
  try {
    const result = await axios.post(`${baseUrl}/auth/login`, {
      username,
      password,
    });
    if (!result?.data)
      Swal.fire({
        title: 'Warning!',
        text: msg,
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    localStorage.setItem('userInfo', JSON.stringify(result.data));
    window.location.replace('./index.html');
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Warning!',
      text: msg,
      icon: 'warning',
      confirmButtonText: 'Ok',
    });
  }
};
