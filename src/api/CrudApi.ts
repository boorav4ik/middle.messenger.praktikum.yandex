import BaseApi from "./BaseApi";

// type APIMethod = (identifier?: string, data?: unknown) => Promise<unknown>;
export default abstract class extends BaseApi {
  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(identifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string): Promise<unknown>;
}
