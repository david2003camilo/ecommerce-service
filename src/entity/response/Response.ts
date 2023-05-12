export class ResponseDTO {
    message: string;
    status: number;
    data: any[] | object;
    token?: string;
}