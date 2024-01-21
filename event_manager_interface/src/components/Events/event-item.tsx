import dayjs from 'dayjs'
import EventCreate from './event-create-edit'
import EventDelete from './event-delete'

interface EventItemProps {
  event: {
    id: string
    description: string
    startDate: string
    endDate: string
  }
}

export default function EventItem({ event }: EventItemProps) {
  const { id, description, startDate, endDate } = event

  return (
    <div className="border shadow-md rounded-lg border-teal-400 flex flex-col w-[468px] p-4 gap-6">
      <div className="flex justify-between items-center">
        <span className="">{description}</span>
        <div className="flex gap-1">
          <EventCreate isEditMode={true} event={event} />
          <EventDelete id={id} />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span>início</span>
          <span className="font-bold">
            {dayjs(startDate).format('DD/MM/YYYY HH:mm')}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span>término</span>
          <span className="font-bold">
            {dayjs(endDate).format('DD/MM/YYYY HH:mm')}
          </span>
        </div>
      </div>
    </div>
  )
}
