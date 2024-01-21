import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../../lib/axios'

interface Event {
  id: string
  description: string
  startDate: string
  endDate: string
}

interface CreateEventData {
  description: string
  startDate: string
  endDate: string
}

interface UpdateEventData {
  id: string
  description: string
  startDate: string
  endDate: string
}

interface EventsContextType {
  events: Event[]
  fetchEvents: () => Promise<void>
  createEvent: (data: CreateEventData) => Promise<void>
  updateEvent: (data: UpdateEventData) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
}

export const EventsContext = createContext({} as EventsContextType)

interface EventsProviderProps {
  children: ReactNode
}

export const EventsProvider = ({ children }: EventsProviderProps) => {
  const [events, setEvents] = useState<Event[]>([])

  const fetchEvents = useCallback(async () => {
    const response = await api.get('/events', { withCredentials: true })

    setEvents(response.data.events)
  }, [])

  const createEvent = async (data: CreateEventData) => {
    const { description, startDate, endDate } = data

    const response = await api.post(
      '/events',
      {
        description,
        startDate,
        endDate,
      },
      { withCredentials: true },
    )

    const eventId = response.data.id
    setEvents((oldState) => [
      ...oldState,
      {
        id: eventId,
        description,
        startDate,
        endDate,
      },
    ])
  }

  const updateEvent = async (data: UpdateEventData) => {
    const { id, description, startDate, endDate } = data

    try {
      await api.put(
        `/events/${id}`,
        {
          description,
          startDate,
          endDate,
        },
        { withCredentials: true },
      )

      setEvents((oldState) => {
        return oldState.map((event) => {
          if (event.id === id) {
            return {
              ...event,
              description,
              startDate,
              endDate,
            }
          }

          return event
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteEvent = async (id: string) => {
    await api.delete(`/events/${id}`, { withCredentials: true })

    setEvents((oldState) => oldState.filter((event) => event.id !== id))
  }

  // useEffect(() => {
  //   fetchEvents()
  // }, [fetchEvents])

  return (
    <EventsContext.Provider
      value={{ events, fetchEvents, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  )
}
