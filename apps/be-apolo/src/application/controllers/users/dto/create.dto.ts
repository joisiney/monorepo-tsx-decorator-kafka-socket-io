import { isValid, parse } from 'date-fns'
import { z } from 'zod'

export const userCreateDto = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .transform((val) => val.trim()),
  email: z
    .string({
      required_error: 'E-mail é obrigatória',
    })
    .email({
      message: 'E-mail inválido',
    }),
  address: z
    .string()
    .optional()
    .transform((val) => (val ? val.trim() : null)),
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
      if (!val) return null
      return parse(val, 'yyyy-MM-dd', new Date())
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(6, {
      message: 'Senha deve ter no mínimo 6 caracteres',
    }),
})
export type IUserCreateDto = z.output<typeof userCreateDto>
