import { ResponseDTO } from "../entity/response/Response";

export const responseUtil = (
  status: number,
  message: string,
  data?: any[] | Object,
  token?: string
): ResponseDTO => {
  const res = new ResponseDTO();
  res.status = status;
  res.message = message;
  res.data = data ? data : [];
  res.token = token;
  return res;
};

export const responsePageUtil = (
  status: number,
  message: string,
  data: any[] | Object,
  page?: number,
  limit?:number,
  totalPage?: number
): ResponseDTO => {
  const res = new ResponseDTO();
  res.status = status;
  res.message = message;
  res.data = data ? data : [];
  res.currentPage = page;
  res.limit = limit;
  res.totalPage = totalPage;
  return res;
};
