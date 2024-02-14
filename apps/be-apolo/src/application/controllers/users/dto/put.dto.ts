import { isValid, parse } from 'date-fns'
import { z } from 'zod'

export const userUpdateDto = z
  .object({
    id: z
      .string({
        required_error: 'Id da notícia é obrigatório',
      })
      .transform((val) => +val.trim()),
    name: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val)),
    email: z
      .string()
      .email({
        message: 'E-mail inválido',
      })
      .optional(),
    address: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val)),
    birthdate: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true
          const date = parse(val, 'yyyy-MM-dd', new Date())
          return isValid(date)
        },
        {
          message: 'Data de nascimento inválida',
        },
      )
      .transform((val) => {
        if (!val) return undefined
        return parse(val, 'yyyy-MM-dd', new Date())
      }),
  })
  .refine(
    (data) => {
      return Object.keys(data).length > 1
    },
    {
      message: 'É necessário informar pelo menos um campo para atualização',
    },
  )
export type IUserUpdateDto = z.output<typeof userUpdateDto>
