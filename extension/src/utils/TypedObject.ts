// eslint-disable-next-line @typescript-eslint/no-type-alias
type Entries<T> = Array<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T]
>;

function entries<T>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export const TypedObject = {
  entries,
};
