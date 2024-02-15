import { INewsDto } from '@olympus/domain-ceos'
import { useFindAllService } from '@olympus/fe-rn-atena/src/pages/home/hooks/find-all-service.hook'
import { clientHttp } from '@olympus/gateway-eros'
import { renderHook, waitFor } from '@testing-library/react-native'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NewsMockList } from '../../../../../utils/mocks/news.mock'
import { PaginationMock } from '../../../../../utils/mocks/pagination.mock'
import { wrapper } from '../../../../../utils/react-query'

const news = NewsMockList()
const responseMock = PaginationMock(news)

describe('@olympus/fe-rn-atena/useFindAllService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('@olympus/gateway-eros->useAllNews/success', async () => {
    vi.spyOn(clientHttp.api, 'get').mockImplementation(() =>
      Promise.resolve(responseMock),
    )
    const { result } = renderHook<
      {
        isLoading?: boolean
        handleInfiniteScroll: () => void
        data?: INewsDto[]
      },
      any
    >(() => useFindAllService(), {
      wrapper,
    })
    await waitFor(() => result.current.isLoading === true)
    await new Promise((resolve) => setTimeout(resolve, 1))
    await waitFor(() => result.current.isLoading === false)
    expect(result.current.data?.length).toBe(responseMock.total)
  })
})
