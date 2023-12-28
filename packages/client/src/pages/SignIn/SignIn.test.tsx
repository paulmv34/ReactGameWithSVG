import React from 'react'
import * as renderer from 'react-test-renderer'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import SignIn from '@/pages/SignIn/SignIn'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { fieldErrorMessages } from '@/utils/validationSchema'
import { sleep } from '@/mechanics/utils'

jest.mock('clsx', () => ({
  default: jest.fn(),
}))

const testApp = (
  <BrowserRouter>
    <Routes>
      <Route path={'*'} element={<SignIn />} />
    </Routes>
  </BrowserRouter>
)

const setup = () => {
  const user = userEvent.setup()
  const formPage = render(testApp)

  const loginInput = screen.getByLabelText('Логин')
  const passwordInput = screen.getByLabelText('Пароль')
  const submitButton = screen.getByRole('button', { name: /войти/i })

  return {
    user,
    formPage,
    loginInput,
    passwordInput,
    submitButton,
  }
}

test('should correctly displayed', async () => {
  const { loginInput, passwordInput, submitButton } = setup()
  expect(loginInput).toBeDefined()
  expect(passwordInput).toBeDefined()
  expect(submitButton).toBeDefined()
})

test('should correctly validate single input interaction', async () => {
  const { loginInput, passwordInput, user } = setup()
  await user.type(loginInput, '111ThisLoginIsIncorrect')
  await user.click(passwordInput)
  expect(screen.getAllByText(fieldErrorMessages.wrongFormat)).toHaveLength(1)
})

test('should correctly validate empty form submit', async () => {
  const { submitButton, user } = setup()
  await user.click(submitButton)
  await sleep(10)
  expect(screen.getAllByText(fieldErrorMessages.required)).toHaveLength(2)
})

test('should correctly validate incorrect form submit', async () => {
  const { loginInput, passwordInput, submitButton, user } = setup()
  await user.type(loginInput, '111ThisLoginIsIncorrect')
  await user.type(passwordInput, 'thispasswordisincorrect')
  await user.click(submitButton)
  await sleep(10)
  expect(screen.getAllByText(fieldErrorMessages.wrongFormat)).toHaveLength(2)
})

test('should submit correct form', async () => {
  const { loginInput, passwordInput, submitButton, user } = setup()
  await user.type(loginInput, 'login')
  await user.type(passwordInput, 'Password1')
  await user.click(submitButton)
  await sleep(200)
})

test('should be equal to snapshot', async () => {
  const tree = renderer.create(testApp).toJSON()
  expect(tree).toMatchSnapshot()
})
