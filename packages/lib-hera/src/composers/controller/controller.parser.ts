import { z } from 'zod'
import { ZodException } from '../../application/shared'
import { ControllerParams } from './controller.params'
export class ControllerParamsParser {
  public parseTo(dto: z.ZodObject<any> | z.ZodEffects<any, any>) {
    if (!dto) return null
    try {
      return dto.parse(this.raw.params)
    } catch (error) {
      throw new ZodException(error)
    }
  }

  constructor(private readonly raw: ControllerParams) {}
}
