enum Method {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE"
}

function queryStringify(data: string) {
  return Object.entries(data)
    .map((s) => s.join("="))
    .join("&");
}

type Options = {
  data?: string | Record<string, any>;
  headers?: Record<string, string>;
};

type HTTPMethodOptions = Options & { timeout?: number };

type RequestOptions = Options & { method: Method };

type HTTPMethod = (url: string, options?: HTTPMethodOptions) => Promise<any>;
export class HTTPTransport {
  static url = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.url}${endpoint}`;
  }

  public get: HTTPMethod = (url = "/", options = {}) =>
    this.request(url, { ...options, method: Method.Get }, options.timeout);

  public put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: Method.Put }, options.timeout);

  public post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: Method.Post }, options.timeout);

  public delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: Method.Delete }, options.timeout);

  private request = (
    url: string,
    options: RequestOptions = { method: Method.Get },
    timeout = 5000
  ): Promise<Response> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        this.endpoint +
          (method === Method.Get && data ? [url, queryStringify(data as string)].join("?") : url)
      );

      if (headers) {
        Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
      }

      xhr.onload = function onload() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.withCredentials = true;
      xhr.responseType = "json";

      xhr.timeout = timeout;
      if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
