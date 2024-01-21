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
    <div className="border border-zinc-500 flex flex-col w-[468px] p-4 gap-4">
      <div className="flex justify-between items-center">
        <span className="">{description}</span>
        <div className="flex gap-1">
          <EventCreate isEditMode={true} event={event} />
          <EventDelete id={id} />
        </div>
      </div>

      <div className="flex justify-between">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
    </div>
  )
}
