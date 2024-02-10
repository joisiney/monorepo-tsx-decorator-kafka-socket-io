export class ZodException extends Error {
  public readonly code = 400
  constructor(zodError: any) {
    super('ZodException: unknown')
    let msg = this.message
    const errors = zodError.issues ?? zodError.errors ?? []
    if (errors.length > 0) {
      const error = errors[0]
      msg = error.message
    } else if (zodError.message) {
      msg = zodError.message
    }
    this.message = msg
  }
}
