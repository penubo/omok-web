import { dispatch, ID } from '../action/gameStore'
import { Turn } from '../action/gameTypes'
import { sendMessage } from './server'
import { Message } from './type'

export function place(x: number, y: number) {
  const message = {
    type: 'place',
    args: { x, y },
  }

  sendMessage(message)
}

export function giveup() {
  const message = { type: 'giveup', args: {} }
  sendMessage(message)
}

export function restart() {
  const message = { type: 'restart', args: {} }
  sendMessage(message)
}

export function start(userStone: Turn) {
  const message = { type: 'init', args: { id: ID, userStone } }
  sendMessage(message)
}

export function join() {
  const message = { type: 'join', args: { id: ID } }
  sendMessage(message)
}

export function updateGameStateFromServerMessage(message: Message) {
  const { type, args } = message
  // TODO: Fix to start only when start button is clicked
  // Need to store opponent id to store
  if (type === 'join') {
    const joinArgs = args as { id: string }
    if (joinArgs.id !== ID) {
      start(Turn.Black)
    }
  }
  dispatch(type, args)
}
