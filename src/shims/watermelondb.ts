// WatermelonDB web shim — not active on web preview
export class Model {
  static table = '';
  static associations = {};
}

export class Database {
  constructor() {}
  get(table: string) {
    return { find: async () => null, query: () => ({ fetch: async () => [] }) };
  }
  write(fn: any) { return fn(); }
}

export const appSchema = (schema: any) => schema;
export const tableSchema = (schema: any) => schema;
export const Q = {
  where: () => ({}),
  like: () => ({}),
  sanitizeLikeString: (s: string) => s,
};

// Decorators (no-ops on web)
export const field = () => (_target: any, _key: string) => {};
export const text = () => (_target: any, _key: string) => {};
export const date = () => (_target: any, _key: string) => {};
export const readonly = () => (_target: any, _key: string) => {};
export const children = () => (_target: any, _key: string) => {};
export const relation = () => (_target: any, _key: string) => {};
export const json = () => (_target: any, _key: string) => {};
export const immutableRelation = () => (_target: any, _key: string) => {};

// SQLite adapter shim
export class SQLiteAdapter {
  constructor(_options: any) {}
}
export default SQLiteAdapter;

// Migrations shim
export const schemaMigrations = (migrations: any) => migrations;
export const createTable = (table: any) => table;
export const addColumns = (cols: any) => cols;
