import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon";
import { expect } from "chai";
import { HTTPTransport, Method } from "./HTTPTransport";

describe("HTTP Transport Test", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    global.XMLHttpRequest = xhr as any;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport("");
  });

  afterEach(() => {
    requests.length = 0;
  });

  it(".get()", () => {
    instance.get("/test");

    const [request] = requests;

    expect(request.method).to.eq(Method.Get);
  });

  it(".post()", () => {
    instance.post("/test");

    const [request] = requests;

    expect(request.method).to.eq(Method.Post);
  });

  it(".put()", () => {
    instance.put("/test");

    const [request] = requests;

    expect(request.method).to.eq(Method.Put);
  });

  it(".delete()", () => {
    instance.delete("/test");

    const [request] = requests;

    expect(request.method).to.eq(Method.Delete);
  });
});
