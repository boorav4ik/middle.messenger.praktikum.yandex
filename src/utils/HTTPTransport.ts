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

  // eslint-disable-next-line class-methods-use-this
  private request = (
    url: string,
    options: RequestOptions = { method: Method.Get },
    timeout = 5000
  ): Promise<Response> => {
    const { method, data, headers } = options;

    return new Promise((res, rej) => {
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
        res(xhr.response);
      };
      xhr.onabort = rej;
      xhr.onerror = rej;
      xhr.ontimeout = rej;

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

// function fetchWithRetry(url, { retries, ...options }) {
//     function onError(error) {
//         if (retries) {
//             return fetchWithRetry(url, { ...options, retries: retries - 1 })
//         } else {
//             throw error;
//         }
//     };
//     return new HTTPTransport()
//         .request(url, options)
//         .catch(onError)
//         .finally(() => { console.log(retries) });
// }
