import { INewsDto } from '@olympus/domain-ceos'
import { useFindAllService } from '@olympus/fe-rn-atena/src/pages/home/hooks/find-all-service.hook'
import { clientHttp } from '@olympus/gateway-eros'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NewsMockList } from '../../../utils/mocks/news.mock'
import { PaginationMock } from '../../../utils/mocks/pagination.mock'
import { wrapper } from '../../../utils/react-query'

const news = NewsMockList()
const responseMock = PaginationMock(news)

describe('@olympus/fe-rn-atena/useCreateService', () => {
  it.only('@olympus/gateway-eros->useAllNews', async () => {
    vi.spyOn(clientHttp.api, 'get').mockImplementation(() =>
      Promise.resolve(responseMock),
    )

    const { result } = renderHook<
      {
        isLoading?: boolean
        isSuccess?: boolean
        data?: INewsDto[]
      },
      any
    >(() => useFindAllService(), {
      wrapper,
    })
    await waitFor(() => result.current.isLoading)
    await waitFor(() => result.current.isSuccess)

    expect(result.current.data?.length).toBe(responseMock.total)
  })
})
