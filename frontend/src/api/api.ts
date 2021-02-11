import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: `http://localhost:8080`,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err && err.response) {
      let message="Ups, something went wrong!";
      if(err.response.data && err.response.data.message)
        message=err.response.data.message;
      return Promise.reject({message});
    } else {
      return Promise.reject({ message: "Network error" });
    }
  }
);

const Api = {
  get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return instance.get(url, config);
  },

  post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return instance.post(url, data, config);
  },

  patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return instance.patch(url, data, config);
  },

  delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return instance.delete(url, config);
  },

  
};

export default Api;
