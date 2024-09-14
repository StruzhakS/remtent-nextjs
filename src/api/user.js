import { createAxios } from ".";
import { USERINFO } from "./endpoints";

export const userInfo = async () =>
  await createAxios().get(USERINFO);
