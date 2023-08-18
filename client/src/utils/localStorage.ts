export const setLocalStorage = (token: string, user: UserModel) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
