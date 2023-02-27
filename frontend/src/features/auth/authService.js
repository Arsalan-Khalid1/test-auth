import httpRequest from "../../axios";

const BASE_URL = "http://127.0.0.1:5000";

const register = async (userData) => {
  const response = await httpRequest.post(
    BASE_URL + "/auth/register",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await httpRequest.post(BASE_URL + "/auth/login", userData);

  if (response) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const resetPassword = async (userData) => {
  const response = await httpRequest.post(
    BASE_URL + "/auth/reset-password",
    userData
  );

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  resetPassword,
};

export default authService;
