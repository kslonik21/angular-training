import { initialCards } from '../components/card';
const initialState = {
  showComp: false,
  cards: initialCards,
  level:"",
  home: false,
  numTiles: null,
  card1: null,
  card2: null,
  card2id: null,
  card1id: null,
  card1flipped: false,
  card2flipped: false,
  numTiles: 0,
  flippedTiles: 0,
  numMoves:0,
  home: false,
  endGame: false
}

const reducer = (state=initialState,action) => {
  switch(action.type) {
    case "RENDER_CARDS":
      const {showComp,cards,level,numTiles} = action
      return {
        ...state,
        showComp,
        cards,
        level,
        numTiles
      }
    case "BACK_HOME":
      return {
        ...state, home: action.home,cards:action.cards
      }
    case "FIRST_FLIP":
      return {
        ...state,
        card1flipped:action.card1flipped,
        card1: action.card1,
        card1id:action.card1id,
      }
    case "SECOND_FLIP":
      return {
        ...state,
        card2flipped:action.card2flipped,
        card2:action.card2,
        card2id: action.card2id,
      }
    case "HIDE_CARDS":
      return {
        ...state,
        card1: action.card1.classList.add('hide'),
        card2: action.card2.classList.add('hide'),
        card1flipped: false,
        card2flipped: false,
        card1id: null,
        card2id: null
      }
    case "TURN_BACK_CARDS":
      return {
        ...state,
        card1: action.card1.classList.remove('flipped'),
        card2: action.card2.classList.remove('flipped'),
        card1flipped: false,
        card2flipped: false,
        card1id: null,
        card2id: null
      }

    case "COUNT_CARDS":
      return {
        ...state,
        numMoves: state.numMoves+1
      }
    case "COUNT_FLIPPED":
      return {
        ...state,
        flippedTiles: state.flippedTiles+2
      }
    default:
      return state
  }
}
export default reducer;