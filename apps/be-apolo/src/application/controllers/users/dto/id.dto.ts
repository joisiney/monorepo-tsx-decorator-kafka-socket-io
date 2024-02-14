import { z } from 'zod'

export const userIdDto = z.object({
  id: z
    .string({
      required_error: 'ID é obrigatório',
    })
    .transform((val) => +val.trim()),
})
export type IUserIdDto = z.output<typeof userIdDto>
