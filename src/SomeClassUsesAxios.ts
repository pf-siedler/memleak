import axios, { AxiosInstance } from "axios";

export interface SomeClassUsesAxios {
  hoge():Promise<any>;
}

// constructor で AxiosInstance を生成しメンバに保持する class
export class AlwaysCreateInstance implements SomeClassUsesAxios{
    private readonly apiClient: AxiosInstance;

    public constructor() {
        this.apiClient = axios.create({
            baseURL: "http://example.com",
        });
    }

    public async hoge() {
        await this.apiClient.get("/hoge");
        return true;
    }
}

// constructor で引数から AxiosInstance を受け取る
export class GetInstanceFromArgs implements SomeClassUsesAxios{
  public constructor(private readonly apiClient:AxiosInstance){}

  public async hoge() {
    await this.apiClient.get("/hoge");
    return true;
  }
}

