export const pick = <T extends { [key: string]: any }>(
  pick: string[],
  response: T,
) => {
  if (pick.length > 0) {
    return pick.reduce((obj, key) => {
      if (key in response) {
        obj[key as keyof typeof obj] = response[key as keyof T]
      }
      return obj
    }, {} as Partial<T>)
  }
}
