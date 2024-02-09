export class ZodException extends Error {
  public readonly code = 400
  constructor(
    zodError: any,
  ) {
    let msg = 'ZodException: unknown'
    const errors = zodError.issues ?? zodError.errors ?? []
    if (errors.length > 0) {
      const error = errors[0]
      msg = error.message
    }else if(zodError.message){
      msg = zodError.message
    }
    super(msg)
  }
}
