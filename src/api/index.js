import axios from "axios";

export const createAxios = (type = "api") => {
  const token = localStorage.getItem("access_token");

  let options;

  type === "login"
    ? (options = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      baseURL: process.env.REACT_APP_BASE_URL
    })
    : type === "api"
      ? (options = {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
          "Access-Control-Allow-Origin": "*"
        },
        baseURL: process.env.REACT_APP_BASE_URL
      })
      : type === "cors"
        ? (options = {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${ token }`,
            "Access-Control-Allow-Origin": "*"
          },
          baseURL: process.env.REACT_APP_BASE_URL
        })
        : (options = {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          baseURL: process.env.REACT_APP_BASE_URL
        });

  let instance = axios.create(options);

  instance.interceptors.response.use(
    response => response,
    error => Promise.reject({ ...error })
  );

  return instance;
};

export * from "./endpoints";

export const fetchUniqueOffers = async (category) => {
  const response = await createAxios("api").get('/api/promotions/', { params: { category } });
  return response.data;
};

export const fetchCategories = async () => {
  try {
    const response = await createAxios("api").get('/api/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
