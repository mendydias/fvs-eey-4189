export class DuplicateKeyError extends Error {
  private key;
  constructor(key: string) {
    super(`Trying to save entity with duplicate key: ${key}`);
    this.name = "DuplicateKeyError";
    this.key = key;
  }

  get duplicateKey() {
    return this.key;
  }
}
