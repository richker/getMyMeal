import axios from "axios";

axios.interceptors.response.use(null, error => {
  console.log(error);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  console.log(error.response);
  console.log(error);

  if (!expectedError) {
    return "Error";
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
