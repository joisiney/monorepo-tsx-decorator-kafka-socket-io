export const urlFormat = (...rest: string[] | string[][]) => {
  const list = rest.flat().map((item) => {
    if (item.startsWith('/')) {
      return item.slice(1)
    }
    return item
  })
  return '/' + list.filter(Boolean).join('/')
}
