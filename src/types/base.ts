export type Dict<K extends string = string, V = any> = { [P in K]: V };

export type Func<R, P extends any[] = any[]> = (...p: P) => R;
