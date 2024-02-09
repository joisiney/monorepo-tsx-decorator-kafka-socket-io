export class ConflictException extends Error {
  public readonly code = 409

  constructor(
    message: string,
    public readonly error?: Error,
  ) {
    super(message)
    this.name = 'ConflictException'
  }
}
