import React, { useCallback, useState, useEffect } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useOthers, useMyPresence } from '@/liveblocks.config'
import { CursorMode } from '@/types/type'
import CursorChat from './cursor/CursorChat'

const Live = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence() as any
  const [cursorState, setCursorState] = useState({ mode: CursorMode?.Hidden })

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    const x = e.clientX - e.currentTarget.getBoundingClientRect().x
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y

    updateMyPresence({ cursor: { x, y } })

  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {

    const x = e.clientX - e.currentTarget.getBoundingClientRect().x
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y

    updateMyPresence({ cursor: { x, y } })

  }, [])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden })

    updateMyPresence({ cursor: null, message: null })
  }, [])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: ''
        })
      }
      else if (e.key === 'Escape') {
        updateMyPresence({ message: '' })
        setCursorState({ mode: CursorMode.Hidden })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
      }
    }

    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [updateMyPresence])

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="h-[100vh] w-full flex justify-center items-center text-center border-2 border-red-600"
    >
      <h1 className="text-6xl text-white">Heading</h1>
      {
        cursor &&
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      }
      <LiveCursors others={others} />
    </div>
  )
}

export default Live