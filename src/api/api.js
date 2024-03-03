import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// interceptors when user request for something
api.interceptors.request.use(
  (config) => {
    config.headers["Name"] = "Moudud"; // added a name property to header
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => {
    // TODO: here we can customize the response
    return response;
  },
  (err) => {
    // TODO: here we can customize the err
    return Promise.reject(err);
  }
);
export { api };
