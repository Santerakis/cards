export type ArgsSignUpType = {
  name?: string
  password: string
  email: string
}
export type UserType = {
  avatar: string
  id: string
  isEmailVerified: boolean
  created: string
  updated: string
  name: string
  email: string
}

export type ArgsSignInType = Omit<ArgsSignUpType, 'name'>
export type SignInResponseType = {
  accessToken: string
}
export type ArgRefreshMeType = {
  name?: string
  avatar?: string
  email?: string
}
export type ArgRecoverPasswordType = {
  html?: string
  email: string
  subject?: string
}
export type ArgResetPasswordType = {
  password: string
  token: string
}
