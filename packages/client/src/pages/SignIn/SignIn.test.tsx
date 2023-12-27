import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SignIn from '@/pages/SignIn/SignIn'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}))

// снапшот
// describe('pages/SignIn', () => {
//   it('test snapshot', () => {
//     const tree = renderer.create(
//       <SignIn />
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
//   })
// })

// проверка форма авторизации отобразилась

// проверка точечной валидации (логин)
// проверка валидации на форме (пустая)
// fireEvent.click(screen.getByText('Load Greeting'))
// expect(screen.getByRole('heading')).toHaveTextContent('hello there')
// проверка валидации на форме (некорректная)
// проверка валидации на форме (корректная)

test('Example test', async () => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  )
  // expect(screen.getByRole('form')).toBeDefined()
})
