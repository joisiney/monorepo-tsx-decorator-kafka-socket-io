import { Header } from '@olympus/fe-rn-atena/src/components/home/header'
import { render, screen } from '@testing-library/react-native'
import { describe, expect, it } from 'vitest'

describe('@olympus/fe-rn-atena/Component-> <Header/>', () => {
  it.each([undefined, null, 0, -1])('should render empty message', (total) => {
    render(<Header total={total as any as number} />)
    const cpfInputError = screen.queryByText('Você não tem notícias')
    expect(cpfInputError).toBeTruthy()
  })
  it.each([1, 2])(
    'should render message stating that there is news',
    (total) => {
      render(<Header total={total as any as number} />)
      const cpfInputError = screen.queryByText('Você tem')
      expect(cpfInputError).toBeTruthy()
    },
  )
})
