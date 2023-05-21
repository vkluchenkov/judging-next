export interface ApiOptions {
  url: string;
}

export interface Judge {
  id: number;
  name: string;
}

export interface LoginDto {
  token: string;
  judge: Judge;
}

export interface ErrorDto {
  statusCode: number;
  message: string;
}
