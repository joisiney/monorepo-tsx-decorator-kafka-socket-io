import {
  Left,
  Right,
  type Either,
} from '@olympus/lib-hera/src/application/shared/either'
import { describe, expect, it } from 'vitest'
describe('Either', () => {
  it('should create a Right value', () => {
    const sut = new Right('Success') as Either<string, Error>
    expect(sut.isSuccess).toBe(true)
    expect(sut.isError).toBe(false)
    expect(sut.value).toBe('Success')
  })

  it('should create a Left value', () => {
    const sut = new Left(new Error('Error')) as Either<string, Error>
    expect(sut.isSuccess).toBe(false)
    expect(sut.isError).toBe(true)
    expect(sut.error.message).toBe('Error')
  })

  it('should not be possible to receive a mistake in a successful case', () => {
    const sut = new Right('Success') as Either<string, Error>
    expect(sut.isSuccess).toBe(true)
    expect(sut.isError).toBe(false)
    expect(() => sut.error).toThrowError(
      'Não é possível obter erro da direita.',
    )
    expect(() => sut.lanchError()).toThrowError(
      'Não é possível obter erro da direita.',
    )
  })
  it('should not be possible to succeed in an error case', () => {
    const sut = new Left(new Error('any_error')) as Either<string, Error>
    expect(sut.isSuccess).toBe(false)
    expect(sut.isError).toBe(true)
    expect(() => sut.value).toThrowError(
      /Não é possível obter valor da esquerda. Erro/gi,
    )
  })
})
