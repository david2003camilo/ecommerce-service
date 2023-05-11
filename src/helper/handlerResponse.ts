import { ResponseDTO } from "../entity/response/Response";

export const responseUtil = (
  status: number,
  message: string,
  data?: any[],
  token?: string
): ResponseDTO => {
  const res = new ResponseDTO();
  res.status = status;
  res.message = message;
  res.data = data ? data : [];
  res.token = token
  return res;
};
