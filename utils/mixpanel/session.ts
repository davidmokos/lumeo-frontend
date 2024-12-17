import "server-only"
import { cookies } from "next/headers"

type SessionId = string

export async function getSessionId (): Promise<SessionId | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get("session-id")?.value
}

export async function setSessionId (sessionId: SessionId): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("session-id", sessionId)
}

export async function getAndCreateSessionIdIfMissing(): Promise<SessionId> {
  const sessionId = await getSessionId()
  if (!sessionId) {
    const newSessionId = crypto.randomUUID()
    setSessionId(newSessionId)
    return newSessionId
  }
  return sessionId
}

export async function createSessionIdIfMissing(): Promise<SessionId> {
  const sessionId = await getSessionId()
  if (!sessionId) {
    const newSessionId = crypto.randomUUID()
    return newSessionId
  }
  return sessionId
}
