import { useContext, useEffect } from 'react'
import { AuthenticationContext } from '../../contexts/Authentication/AuthenticationContext'
import EventItem from './event-item'
import { useContextSelector } from 'use-context-selector'
import { EventsContext } from '../../contexts/Events/EventsContext'

export default function EventList() {
  const { userSessionId } = useContext(AuthenticationContext)

  const fetchEvents = useContextSelector(EventsContext, (context) => {
    return context.fetchEvents
  })

  const events = useContextSelector(EventsContext, (context) => {
    return context.events
  })

  useEffect(() => {
    if (userSessionId) {
      fetchEvents()
    }
  }, [userSessionId, fetchEvents])

  return (
    <div className="w-full border border-zinc-500 flex flex-col items-center p-4 gap-4">
      {events && events.length > 0 ? (
        events.map((userEvent) => {
          return <EventItem key={userEvent.id} event={userEvent} />
        })
      ) : (
        <span>você ainda não tem nenhum evento cadastrado!</span>
      )}
    </div>
  )
}
