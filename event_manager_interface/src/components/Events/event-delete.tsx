import { Trash, XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useContextSelector } from 'use-context-selector'
import { EventsContext } from '../../contexts/Events/EventsContext'

interface EventDeleteProps {
  id: string
}

export default function EventDelete({ id }: EventDeleteProps) {
  const deleteEvent = useContextSelector(EventsContext, (context) => {
    return context.deleteEvent
  })

  const handleEventDelete = async () => {
    await deleteEvent(id)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-red-400 border border-red-600 rounded py-1 px-1 hover:bg-red-500">
          <Trash size={16} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-full h-full inset-0 bg-zinc-900 bg-opacity-75">
          <Dialog.Content
            className="w-[320px] border rounded-md py-10 px-10 bg-zinc-100 fixed top-1/2 
            left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6"
          >
            <Dialog.Title>
              Tem certeza que deseja remover o evento?
            </Dialog.Title>
            <Dialog.Close className="absolute top-2 right-2 cursor-pointer">
              <XCircle size={24} />
            </Dialog.Close>

            <Dialog.Close className="w-full flex items-center justify-end">
              <span
                onClick={handleEventDelete}
                className="rounded-3xl border-2 border-solid border-teal-300 
                  bg-teal-300 text-zinc-900 text-xs font-bold py-2 px-6 tracking-wider 
                  uppercase hover:bg-teal-400 hover:border-teal-400 hover:duration-200 
                  disabled:opacity-50
                  active:scale-95 focus:outline-none"
              >
                confirmar
              </span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
