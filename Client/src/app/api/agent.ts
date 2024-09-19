import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async function (response) {
    if (import.meta.env.DEV) await sleep();
    return response;
  },
  function (error: AxiosError) {
    if (error) {
      const { data, status } = error.response as AxiosResponse;
      switch (status) {
        case 400:
          if (data && data.errors) {
            const modelStateErrors: string[] = [];
            for (const key in data.errors) {
              modelStateErrors.push(data.errors[key]);
            }
            throw modelStateErrors.flat();
          }
          toast.error(data.title);
          break;
        case 401:
          toast.error(data.title);
          break;
        case 500:
          //   router.navigate("/server-error", { state: { error: data } })
          break;
        default:
          toast.error("An unexpected error occurred");
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};

const UserAccounts = {
  createAccount: (values: any) =>
    requests.post("userAccounts/createAccount", values),
  getAllAccounts: () => requests.get("userAccounts"),
  getAccountById: (id: number) => requests.get(`userAccounts/${id}`),
  deleteAccount: (id: number) =>
    requests.delete(`userAccounts/deleteAccount/${id}`),
  updateAccount: (values: any) =>
    requests.put("userAccounts/updateAccount", values),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
  Account,
  UserAccounts,
  TestErrors,
};

export default agent;
