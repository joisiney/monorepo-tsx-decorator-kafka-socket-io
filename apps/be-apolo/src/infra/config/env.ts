import { env } from 'process'
import { z } from 'zod'

const envVariables = z.object({
  PORT: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DATABASE: z.string(),
  BROKERS: z.string(),
  MECHANISM: z.string(),
  USERNAME: z.string(),
  PASSWORD: z.string(),
})
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
envVariables.parse(env)
