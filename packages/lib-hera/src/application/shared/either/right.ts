export class Right<R, L> {
  constructor(private readonly _value: R) {}

  get isError(): boolean {
    return false
  }

  get isSuccess(): boolean {
    return true
  }

  get value(): R {
    return this._value as R
  }

  get error(): L {
    throw new Error('Não é possível obter erro da direita.')
  }

  lanchError(): void {
    throw new Error('Não é possível obter erro da direita.')
  }
}
