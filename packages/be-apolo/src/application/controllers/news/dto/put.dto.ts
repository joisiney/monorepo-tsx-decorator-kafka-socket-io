import { z } from 'zod'

export const newsUpdateDto = z.object({
  id: z.string({
    required_error: 'Id da notícia é obrigatório',
  }),
  title: z.string({
    required_error: 'Título da notícia é obrigatório',
  }),
  description: z.string({
    required_error: 'Descrição da notícia é obrigatória',
  }),
  content: z.string({
    required_error: 'Conteúdo da notícia é obrigatório',
  }),
  createdAt: z.date({
    required_error: 'Data de criação da notícia é obrigatória',
  }),
  thumbnail: z
    .string({
      required_error: 'Thumbnail da notícia é obrigatório',
    })
    .url({
      message: 'Thumbnail da notícia deve ser uma URL válida',
    }),
})
export type INewsUpdateDto = z.output<typeof newsUpdateDto>
