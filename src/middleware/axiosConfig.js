import axios from "axios";

const instance = axios.create();
instance.interceptors.request.use(function (config) {
  if (localStorage.getItem("role")) {
    let role = JSON.parse(localStorage.getItem("role"));
    config.params = {
      ...config.params,
      role: role.role,
      id: role.userId,
    };
  }

  return config;
});

export default instance;
