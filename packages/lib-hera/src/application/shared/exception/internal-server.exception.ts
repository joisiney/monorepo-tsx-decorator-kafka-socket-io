export class InternalServerException extends Error {
  public readonly code = 500

  constructor(
    message: string,
    public readonly error?: Error,
  ) {
    super(message)
    this.name = 'InternalServerException'
  }
}
