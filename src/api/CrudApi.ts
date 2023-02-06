import { BaseApi } from "./BaseApi";

export abstract class CrudApi extends BaseApi {
  public abstract create(data: unknown): Promise<unknown>;

  public abstract read(data: Record<string, unknown>): Promise<unknown>;

  public abstract update?(identifier: number, data: unknown): Promise<unknown>;

  public abstract delete(identifier: number): Promise<unknown>;
}
