import * as Dialog from '@radix-ui/react-dialog'
import { Pencil, XCircle } from '@phosphor-icons/react'

import * as zod from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { EventsContext } from '../../contexts/Events/EventsContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
// import dayjs from 'dayjs'

const eventFormSchema = zod.object({
  description: zod.string().min(1, { message: 'a descrição é obrigatória' }),
  startDate: zod.string().min(1, { message: 'a data de início é obrigatória' }),
  endDate: zod.string().min(1, { message: 'a data de fim é obrigatória' }),
})

type EventFormInputs = zod.infer<typeof eventFormSchema>

interface EventFormProps {
  isEditMode?: boolean
  event?: {
    id: string
    description: string
    startDate: string
    endDate: string
  }
}

export default function EventCreate({
  isEditMode = false,
  event,
}: EventFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<EventFormInputs>({
    resolver: zodResolver(eventFormSchema),
  })

  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false)
  const handleDisplaySuccessMessage = () => {
    setDisplaySuccessMessage(true)

    setTimeout(() => {
      setDisplaySuccessMessage(false)
    }, 2500)
  }

  const createEvent = useContextSelector(EventsContext, (context) => {
    return context.createEvent
  })

  const updateEvent = useContextSelector(EventsContext, (context) => {
    return context.updateEvent
  })

  const handleFormSubmit = async (data: EventFormInputs) => {
    console.log(data)

    if (!isEditMode) {
      return handleCreateEvent(data)
    }

    return handleUpdateEvent(data)
  }

  const handleCreateEvent = async (data: EventFormInputs) => {
    await createEvent(data)

    reset()

    handleDisplaySuccessMessage()
  }

  const handleUpdateEvent = async (data: EventFormInputs) => {
    if (event) {
      await updateEvent({ id: event.id, ...data })

      handleDisplaySuccessMessage()
    }
  }

  useEffect(() => {
    if (isEditMode && event) {
      setValue('description', event.description)
      // setValue('startDate', dayjs(event.startDate).format('MM/DD/YYYY HH:mm'))
      setValue('startDate', event.startDate)
      setValue('endDate', event.endDate)
    }
  }, [isEditMode, event, setValue])

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {!isEditMode ? (
          <button
            className="rounded-3xl border-2 border-solid border-teal-300 
                  bg-teal-300 text-zinc-900 text-xs font-bold py-2 px-4 tracking-wider 
                  uppercase hover:bg-teal-400 hover:border-teal-400 hover:duration-200 
                  disabled:opacity-50
                  active:scale-95 focus:outline-none"
          >
            novo evento
          </button>
        ) : (
          <button className="bg-teal-400 border border-teal-600 rounded py-1 px-1 hover:bg-teal-500">
            <Pencil size={16} />
          </button>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-full h-full inset-0 bg-zinc-900 bg-opacity-75">
          <Dialog.Content
            onInteractOutside={(e) => {
              e.preventDefault()
            }}
            className="w-[320px] border rounded-md py-10 px-10 bg-zinc-100 fixed top-1/2 
              left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6"
          >
            <Dialog.Title className="text-center font-bold text-xl">
              {!isEditMode ? 'Criar novo evento' : 'Editar evento'}
            </Dialog.Title>
            <Dialog.Close
              onClick={() => {
                !isEditMode && reset()
              }}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <XCircle size={24} />
            </Dialog.Close>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-1"
            >
              <input
                className="bg-zinc-200 border-none py-3 px-4 my-2 mx-0 w-full placeholder:text-zinc-500 placeholder:text-sm"
                type="text"
                placeholder="descrição"
                {...register('description')}
              />
              {errors.description && (
                <span className="text-red-400 text-xs pl-4 text-left">
                  {errors.description.message}
                </span>
              )}

              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
              >
                <div className="mt-4">
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DateTimePicker
                          minDateTime={dayjs(new Date())}
                          minutesStep={15}
                          className="bg-zinc-200 border-none py-3 px-4 my-2 mx-0 w-full placeholder:text-zinc-500 placeholder:text-sm"
                          label="data de início"
                          value={dayjs(field.value)}
                          onChange={(newValue) =>
                            field.onChange(
                              dayjs(newValue).format('YYYY-MM-DD HH:mm'),
                            )
                          }
                        />
                      )
                    }}
                  />
                </div>

                <div className="mt-4">
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DateTimePicker
                          disablePast={true}
                          minutesStep={15}
                          minDateTime={dayjs(new Date()).add(15, 'minute')}
                          className="bg-zinc-200 border-none py-3 px-4 my-2 mx-0 w-full placeholder:text-zinc-500 placeholder:text-sm"
                          label="data de término"
                          value={
                            !isEditMode
                              ? dayjs(field.value).add(15, 'minute')
                              : dayjs(field.value)
                          }
                          onChange={(newValue) =>
                            field.onChange(
                              dayjs(newValue).format('YYYY-MM-DD HH:mm'),
                            )
                          }
                        />
                      )
                    }}
                  />
                </div>
              </LocalizationProvider>

              {displaySuccessMessage && (
                <span className="text-green-500 text-base text-center">
                  {!isEditMode
                    ? 'evento criado com sucesso!'
                    : 'evento atualizado com sucesso!'}
                </span>
              )}

              <button
                className="mt-4 mx-auto rounded-3xl border-2 border-solid border-teal-300
                  bg-teal-300 text-zinc-900 text-xs font-bold py-2 px-6 tracking-wider 
                  uppercase hover:bg-teal-400 hover:border-teal-400 hover:duration-200 
                  disabled:opacity-50
                  active:scale-95 focus:outline-none"
                type="submit"
                disabled={isSubmitting}
              >
                {!isEditMode ? 'cadastrar' : 'atualizar'}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
