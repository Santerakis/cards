import {
  ArgRecoverPasswordType,
  ArgResetPasswordType,
  ArgsSignInType,
  ArgsSignUpType,
  SignInResponseType,
  UserType,
} from '@/services/auth/auth.api.types.ts'
import { commonApi } from '@/services/common/common.api.ts'

export const authAPI = commonApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<UserType | null, void>({
      query: () => {
        return {
          method: 'GET',
          url: 'v1/auth/me',
        }
      },
      extraOptions: { maxRetries: 0 },
      providesTags: ['ME'],
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        method: 'POST',
        url: 'v1/auth/logout',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authAPI.util.updateQueryData('getMe', undefined, () => {
            return null
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    refreshMe: builder.mutation<void, void>({
      query: () => {
        return {
          method: 'GET',
          url: 'v1/auth/refresh-token',
        }
      },
    }),
    updateMe: builder.mutation<UserType, FormData>({
      query: data => {
        return {
          method: 'PATCH',
          url: 'v1/auth/me',
          body: data,
        }
      },
      invalidatesTags: ['ME'],
    }),
    signUp: builder.mutation<UserType, ArgsSignUpType>({
      query: ({ email, password }) => {
        return {
          method: 'POST',
          url: 'v1/auth/sign-up',
          body: { email, password },
        }
      },
    }),
    signIn: builder.mutation<SignInResponseType, ArgsSignInType>({
      query: ({ email, password }) => {
        return {
          method: 'POST',
          url: 'v1/auth/login',
          body: { email, password },
        }
      },
      invalidatesTags: ['ME'],
    }),
    verifyEmail: builder.mutation<void, string>({
      query: code => {
        return {
          method: 'POST',
          url: 'v1/auth/verify-email',
          body: { code },
        }
      },
    }),
    resendEmail: builder.mutation<void, string>({
      query: userId => {
        return {
          method: 'POST',
          url: 'v1/auth/resend-verification-email',
          body: { userId },
        }
      },
    }),
    recoverPassword: builder.mutation<void, ArgRecoverPasswordType>({
      query: ({ email, html, subject }) => {
        return {
          method: 'POST',
          url: 'v1/auth/recover-password',
          body: { email, html, subject },
        }
      },
    }),
    resetPassword: builder.mutation<void, ArgResetPasswordType>({
      query: ({ password, token }) => {
        return {
          method: 'POST',
          url: `v1/auth/reset-password/${token}`,
          body: { password },
        }
      },
    }),
  }),
})

export const {
  useUpdateMeMutation,
  useRecoverPasswordMutation,
  useSignOutMutation,
  useGetMeQuery,
  useSignUpMutation,
  useSignInMutation,
  useResetPasswordMutation,
} = authAPI
