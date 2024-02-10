import { z } from 'zod'

export const newsUpdateDto = z
  .object({
    id: z.string({
      required_error: 'Id da notícia é obrigatório',
    }),
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z
      .string()
      .url({
        message: 'Thumbnail da notícia deve ser uma URL válida',
      })
      .optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).length > 1
    },
    {
      message: 'É necessário informar pelo menos um campo para atualização',
    },
  )
export type INewsUpdateDto = z.output<typeof newsUpdateDto>
