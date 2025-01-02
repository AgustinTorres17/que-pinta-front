

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RestRequestOptions {
  format: 'json' | 'form';
}

interface RestRequest {
  method: HttpMethod;
  body?: any;
  headers: Record<string, string>;
}

export class RestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export default class RestHelper {
  public static async get<T>(url: string, options?: RestRequestOptions): Promise<T> {
    return await this.restRequest("GET", url, options);
  }

  public static async post<T>(url: string, body?: any, options?: RestRequestOptions): Promise<T> {
    return await this.restRequest("POST", url, body, options);
  }

  public static async patch<T>(url: string, body?: any, options?: RestRequestOptions): Promise<T> {
    return await this.restRequest("PATCH", url, body, options);
  }

  private static async restRequest<T>(method: HttpMethod, url: string, body: any, options?: RestRequestOptions): Promise<T> {
    let request: RestRequest = {
      method: method,
      headers: {
      }
    }

    if(options?.format === 'form') {
      this.buildFormRequest(request, body);
    } else {
      this.buildJsonRequest(request, body);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, request);
    const parsedResponse = await response.json();
    if (response.ok) {
      return parsedResponse;
    } else if(response.status === 401) {
      throw new RestError(parsedResponse.message, response.status);
    } else {
      throw new RestError(parsedResponse.message, response.status);
    }
  }

  private static buildFormRequest(request: RestRequest, body: any) {
    const formData = new FormData();
    append(body);
    request.body = formData;

    function append(value: any, root?: string) {
      if (value instanceof File) {
        appendFile(value, root);
      } else if (Array.isArray(value)) {
        appendArray(value, root);
      } else if (typeof value === 'object') {
        appendObject(value, root);
      } else if (value === undefined) {
        return;
      } else {
        formData.append(root || '', value);
      }
    }

    function appendObject(obj: any, root: string | undefined) {
      for (const item in obj) {
        const key = root ? `${root}[${item}]` : item;
        append(obj[item], key);
      }
    }

    function appendArray(arr: any[], root: string | undefined) {
      const key = root ? `${root}[]` : '[]';
      arr.forEach((value) => {
        append(value, key);
      });
    }

    function appendFile(file: File, root: string | undefined) {
      formData.append(root || '', file);
    }
  }

  private static buildJsonRequest(request: RestRequest, body: any) {
    request.headers["Content-Type"] = "application/json";
    request.body = JSON.stringify(body);
  }
}

