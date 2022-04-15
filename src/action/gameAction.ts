import { State, Turn, Board, Stone, Winner } from './gameTypes'
import produce from 'immer'
import { checkGameState } from '../util/boardUtil'

function place(state: State, x: number, y: number): State {
  const { turn, board, isGameOver } = state

  const newBoardValue = turn === Turn.White ? Stone.White : Stone.Black
  const newBoard: Board = produce(board, (draft) => {
    draft[x][y] = newBoardValue
  })

  const newGameOver = checkGameState(newBoard)

  const newWinner = newGameOver ? turn : null

  const newTurn = turn === Turn.White ? Turn.Black : Turn.White

  return {
    ...state,
    turn: newTurn,
    board: newBoard,
    isGameOver: newGameOver,
    winner: newWinner,
  }
}

function giveup(state: State): State {
  if (state.isGameOver) {
    return state
  }

  const winner: Winner = state.turn === Turn.Black ? Turn.White : Turn.Black
  return { ...state, isGameOver: true, winner }
}

export { place, giveup }
