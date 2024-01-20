import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface RegisterFormProps {
  enableRegisterForm: (value: boolean) => void
}

const registerFormSchema = z.object({
  name: z.string().min(1, { message: 'Insira um nome válido' }),
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

export default function RegisterForm({
  enableRegisterForm,
}: RegisterFormProps) {
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

      // TODO: redirect to user home page
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError && error?.response?.data?.message) {
        return alert(error.response.data.message)
      }

      console.error(error)
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
          className="mt-2 rounded-3xl border-2 border-solid border-teal-300
              bg-transparent text-zinc-900 text-xs font-bold py-3 px-11 tracking-wider 
              uppercase hover:bg-zinc-100 hover:border-teal-400 hover:duration-200 
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
