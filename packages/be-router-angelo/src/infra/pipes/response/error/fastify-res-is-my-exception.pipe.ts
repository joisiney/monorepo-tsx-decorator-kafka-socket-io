import * as Exceptions from '@olympus/lib-hera/src/application/shared/exception'
const classesToCheck = Object.values(Exceptions)
classesToCheck.shift()

export const fastifyResIsMyExceptionPipe = async (acc: any, error: Error) => {
  const [treatedError] = classesToCheck
    .map((myClasse: any) => {
      if (error instanceof myClasse) {
        return myClasse
      }
      return null
    })
    .filter(Boolean) as any as Exceptions.ZodException[]

  return {
    ...acc,
    is: Boolean(treatedError),
    name: treatedError && treatedError.name,
  }
}
