import BaseApi from "./BaseApi";

// type APIMethod = (identifier?: string, data?: unknown) => Promise<unknown>;
export default abstract class extends BaseApi {
  public abstract create(data: unknown): Promise<unknown>;

  public abstract read(data: Record<string, unknown>): Promise<unknown>;

  public abstract update?(identifier: number, data: unknown): Promise<unknown>;

  public abstract delete(identifier: number): Promise<unknown>;
}
