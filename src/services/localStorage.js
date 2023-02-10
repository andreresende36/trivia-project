export const setToken = (data) => {
  localStorage.setItem('token', data.token);
}

export const deleteToken = () => {
  localStorage.setItem('token', '');
}