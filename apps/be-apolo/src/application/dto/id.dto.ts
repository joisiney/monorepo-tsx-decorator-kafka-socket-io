import { z } from 'zod'

export const newsKeyDto = z.object({
  id: z.string({
    required_error: 'Id da notícia é obrigatório',
  }),
})

export type INewsKeyDto = z.infer<typeof newsKeyDto>
