export class NotFoundException extends Error {
  public readonly code = 404

  constructor(
    message: string,
    public readonly error?: Error,
  ) {
    super(message)
    this.name = 'NotFoundException'
  }
}
