export class BadRequestException extends Error {
  public readonly code = 400

  constructor(
    message: string,
    public readonly error?: Error,
  ) {
    super(message)
    this.name = 'BadRequestException'
  }
}
