function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

function setToken(token: string) {
  localStorage.setItem("token", token);
}

export { getToken, setToken };
