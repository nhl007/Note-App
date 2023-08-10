export const setLocalStorage = (
  token: string,
  user: { name: string; email: string }
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
