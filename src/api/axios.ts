import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    // config é o objeto da requisição
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // aqui você modifica e retorna ele
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  async (response) => response,
  async (error) => {
    // Trata erros de resposta

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.clear();
        return Promise.reject(error)
      }
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/refresh",
          {
            refreshToken,
          },
        );
        localStorage.setItem('token', response.data.token)
        return instance(error.config) 
      } catch (error) {
        localStorage.clear();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error)
  },
);
