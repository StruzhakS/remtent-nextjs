import { LOGIN, LOGOUT, SIGNUP, createAxios } from ".";

export const login = async ({ email, password }) =>
  await createAxios("login").post(LOGIN, { email, password });
  
export const registration = async ({ email, password }) =>
  await createAxios("login").post(SIGNUP, { email, password });

export const logout = async () =>
  await createAxios("login").post(LOGOUT);


