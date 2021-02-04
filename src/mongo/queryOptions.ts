import { SortOptionObject } from 'mongodb';

export class QueryOptions {
  limit?: number;
  sort?: [string, number][];
  skip?: number;

  private constructor() {}

  public static create() {
    return new QueryOptions();
  }

  public onPage(page: number = 0, perPage: number = 10): this {
    if (this.limit && this.skip) return this;

    this.limit = perPage;
    this.skip = page * perPage;

    return this;
  }

  public toSkip(skip: number): this {
    if (this.skip) return this;

    return this;
  }

  public sortOn(sort: [string, number][]) {
    if (this.sort) return this;

    this.sort = sort;

    return this;
  }

  public toLimit(limit: number): this {
    if (this.limit) return this;

    this.limit = limit;

    return this;
  }
}
