import axios from "axios";

const httpRequest = axios.create({
  withCredentials: true,
});

httpRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    error.response.status === 401 && window.location.replace("/login");
  }
);

export default httpRequest;
