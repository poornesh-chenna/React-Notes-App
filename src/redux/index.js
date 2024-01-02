import { combineReducers } from '@reduxjs/toolkit'
import takeNotes from './takeNotesSlice'

const rootReducer = combineReducers({
  notes: takeNotes,
})

export default rootReducer
