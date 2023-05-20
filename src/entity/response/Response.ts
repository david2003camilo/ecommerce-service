export class ResponseDTO {
    message: string;
    status: number;
    data: any[] | object;
    token?: string;
    totalPage?: number;
    currentPage?: number;
    limit?:number;
}