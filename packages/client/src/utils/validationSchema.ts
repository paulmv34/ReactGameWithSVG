import * as Yup from 'yup'

const messages = {
  required: 'Обязательно для заполнения',
  fileTooBig: 'Размер файла не должен быть больше 1 МБ',
  wrongFormat: 'Некорректный формат',
  passwordNotMatch: 'Пароли не совпадают',
}

const regexps = {
  login: /^(?=.*[A-Za-z_-])([A-Za-z\d_-]){3,20}$/g,
  password: /^(?=.*[A-Z])(?=.*\d)[@.a-zA-Z\d]{8,40}$/g,
  phone: /^\+?\d{10,15}$/g,
  name: /^([A-Za-z]{1,20}(?:-[A-Za-z]{1,20})?|[А-Яа-я]{1,20}(?:-[А-Яа-я]{1,20})?)$/g,
  email: /^([a-zA-Z\d._-]+@[a-zA-Z\d._-]+\.[a-zA-Z\d_-]+)$/g,
}

const imgSizeLimit = 1000000

const imgFormat = ['image/jpg', 'image/jpeg', 'image/png']

export const validators = {
  login: () => Yup.string().required(messages.required).matches(regexps.login, messages.wrongFormat),
  password: () => Yup.string().required(messages.required).matches(regexps.password, messages.wrongFormat),
  email: () => Yup.string().required(messages.required).matches(regexps.email, messages.wrongFormat),
  phone: () => Yup.string().required(messages.required).matches(regexps.phone, messages.wrongFormat),
  name: () => Yup.string().required(messages.required).matches(regexps.name, messages.wrongFormat),
  passwordRepeat: (refField = 'password') =>
    Yup.string()
      .required(messages.required)
      .matches(regexps.password, messages.wrongFormat)
      .oneOf([Yup.ref(refField)], messages.passwordNotMatch),
  image: () =>
    Yup.mixed<File>()
      .required(messages.required)
      .test('fileSize', messages.fileTooBig, (value) => {
        return value && value.size <= imgSizeLimit
      })
      .test('fileType', messages.wrongFormat, (value) => {
        return value && imgFormat.includes(value.type)
      }),
}

export const avatarFormValidationSchema = Yup.object().shape({
  avatar: validators.image(),
})

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: validators.password(),
  newPassword: validators.password(),
  repeatNewPassword: validators.passwordRepeat('newPassword'),
})

export const profileValidationSchema = Yup.object().shape({
  first_name: validators.name(),
  second_name: validators.name(),
  display_name: validators.name(),
  login: validators.login(),
  email: validators.email(),
  phone: validators.phone(),
})

export const signInValidationSchema = Yup.object().shape({
  login: validators.login(),
  password: validators.password(),
})

export const signUpValidationSchema = Yup.object().shape({
  first_name: validators.name(),
  second_name: validators.name(),
  login: validators.login(),
  email: validators.email(),
  phone: validators.phone(),
  password: validators.password(),
  confirm_password: validators.passwordRepeat('password'),
})

export { messages as fieldErrorMessages }
