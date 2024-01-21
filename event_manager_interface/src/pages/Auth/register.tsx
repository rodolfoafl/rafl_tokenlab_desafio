import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext'

interface RegisterFormProps {
  enableRegisterForm: (value: boolean) => void
}

const registerFormSchema = z.object({
  name: z.string().min(1, { message: 'insira um nome válido' }),
  email: z.string().email({ message: 'insira um email válido' }),
  password: z
    .string()
    .min(6, { message: 'a senha deve ter no mínimo 6 caracteres' }),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

export default function RegisterForm({
  enableRegisterForm,
}: RegisterFormProps) {
  const { setUserName } = useContext(AuthenticationContext)

  const [signUpErrorMessage, setSignUpErrorMessage] = useState(false)
  const [redirectMessage, setRedirectMessage] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleUserRegister = async (data: RegisterFormSchema) => {
    try {
      await api.post(
        '/signup',
        { name: data.name, email: data.email, password: data.password },
        { withCredentials: true },
      )
      setUserName(data.name)

      setSignUpErrorMessage(false)
      setRedirectMessage(true)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (error.response?.status === 422) {
          setSignUpErrorMessage(true)
        }
      }
    }
  }

  return (
    <div
      className={`h-full 
        w-full`}
    >
      <form
        onSubmit={handleSubmit(handleUserRegister)}
        className="bg-white w-full flex flex-col py-0 px-6 sm:px-12 h-full justify-center items-center text-center sign-up-container"
      >
        <h1 className="text-3xl font-bold mb-6">Cadastre-se</h1>

        <div className="flex flex-col w-full py-8">
          <input
            className="bg-zinc-200 border-none py-3 px-4 my-2 mx-0 w-full placeholder:text-zinc-500"
            type="text"
            placeholder="seu nome"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-400 text-xs pl-4 text-left">
              {errors.name?.message}
            </span>
          )}

          <input
            className="bg-zinc-200 border-none py-3 px-4 my-2 mx-0 w-full placeholder:text-zinc-500"
            type="email"
            placeholder="email@exemplo.com"
            {...register('email')}
          />

          {errors.email && (
            <span className="text-red-400 text-xs pl-4 text-left">
              {errors.email.message}
            </span>
          )}
          <input
            className="bg-zinc-200 border-none py-3 px-4 my-2 mx-0 w-full placeholder:text-zinc-500"
            type="password"
            placeholder="******"
            {...register('password')}
          />

          {errors.password && (
            <span className="text-red-400 text-xs pl-4 text-left">
              {errors.password.message}
            </span>
          )}

          {signUpErrorMessage && (
            <span className="text-red-400 text-xs pl-4 text-left">
              usuário já existente, tente novamente
            </span>
          )}

          {redirectMessage && (
            <span className="text-teal-500 text-sm text-center">
              usuário cadastrado com sucesso!
            </span>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-3xl border-2 border-solid border-teal-300 
            bg-teal-300 text-zinc-900 text-xs font-bold py-3 px-11 tracking-wider 
            uppercase hover:bg-teal-400 hover:border-teal-400 hover:duration-200 
            disabled:opacity-50
            active:scale-95 focus:outline-none"
        >
          Cadastrar
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          className="mt-2 rounded-3xl border-2 border-solid border-zinc-500
            bg-transparent text-zinc-900 text-xs font-bold py-3 px-11 tracking-wider 
            uppercase hover:bg-zinc-100 hover:duration-200 
            disabled:opacity-50
            active:scale-95 focus:outline-none"
          onClick={() => enableRegisterForm(false)}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
