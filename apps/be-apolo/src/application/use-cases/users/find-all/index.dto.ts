import { z } from 'zod'

export const userAllDto = z
  .object({
    'x-page': z
      .string()
      .optional()
      .transform((val) => (val ? +val.trim() : 1)),
    'x-take': z
      .string()
      .optional()
      .transform((val) => (val ? +val.trim() : 10)),
  })
  .transform((val) => {
    return {
      page: val['x-page'],
      take: val['x-take'],
    }
  })
export type IUserAllDto = z.output<typeof userAllDto>
