enum Method {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE",
};

function queryStringify(data: string) {
    return Object.entries(data)
        .map((s) => s.join("="))
        .join("&");;
}
type Options  = {
    method: Method;
    data?: any;
    timeout: number;
    headers?: Record<string, string>;
}
export class HTTPTransport {
    public get = (url: string, options: Options) =>
        this.request(url, { ...options, method: Method.Get }, options.timeout);
    public put = (url: string, options: Options) =>
        this.request(url, { ...options, method: Method.Put }, options.timeout);
    public post = (url: string, options: Options) =>
        this.request(url, { ...options, method: Method.Post }, options.timeout);
    public delete = (url: string, options: Options) =>
        this.request(url, { ...options, method: Method.Delete }, options.timeout);

    request = (url: string, options: Options, timeout = 5000) => {
        const { method, data, headers } = options;
        return new Promise((res, rej) => {
            const xhr = new XMLHttpRequest();
            xhr.open(
                method,
                method === Method.Get && data
                    ? [url, queryStringify(data)].join("?")
                    : url
            );
            if (headers) {
                Object.keys(headers).forEach((key) =>
                    xhr.setRequestHeader(key, headers[key])
                );
            }

            xhr.onload = function () {
                res(xhr);
            };
            xhr.onabort = rej;
            xhr.onerror = rej;
            xhr.ontimeout = rej;
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
