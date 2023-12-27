import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SignIn from '@/pages/SignIn/SignIn'
import App from '@/App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/types/types'
import Layout from '@/components/Layout/Layout'

const mockedUsedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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
  render(<SignIn />)
  // expect(screen.getByRole('form')).toBeDefined()
})
