import { z } from 'zod'

export const newsDto = z.object({
  title: z.string({
    required_error: 'Título da notícia é obrigatório',
  }).transform((val) => val.trim()),
  description: z.string({
    required_error: 'Descrição da notícia é obrigatória',
  }).transform((val) => val.trim()),
  content: z.string({
    required_error: 'Conteúdo da notícia é obrigatório',
  }).transform((val) => val.trim()),
  thumbnail: z
    .string({
      required_error: 'Thumbnail da notícia é obrigatório',
    })
    .url({
      message: 'Thumbnail da notícia deve ser uma URL válida',
    }),
})
export type INewsDto = z.output<typeof newsDto>
