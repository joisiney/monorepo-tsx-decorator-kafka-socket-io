import { useQuery } from '@tanstack/react-query'
import { clientHttp } from '../../services/client-http'
export const useCreateNews = () => {
  return useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      clientHttp.get('https://api.github.com/repos/tannerlinsley/react-query'),
  })
}
