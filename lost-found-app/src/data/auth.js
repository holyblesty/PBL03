
export function getLoginUser() {
  try {
    const user = localStorage.getItem('loginUser');

    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Gagal membaca data login:', error);
    return null;
  }
}

export function logout() {
  localStorage.removeItem('loginUser');
}
