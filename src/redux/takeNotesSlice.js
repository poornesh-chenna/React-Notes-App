import { createSlice } from '@reduxjs/toolkit'

const takeNotesSlice = createSlice({
  name: 'note',
  initialState:
    localStorage.getItem('items') !== null
      ? JSON.parse(localStorage.getItem('items'))
      : [],
  reducers: {
    addNotes: (state, action) => {
      state.unshift(action.payload)
      saveItemsInLocalStorage(state)
    },
    deleteNotes: (state, action) => {
      state.splice(action.payload, 1)
      saveItemsInLocalStorage(state)
    },
    editNotes: (state, action) => {
      const index = state.findIndex(
        (note) => note.id.toString() === action.payload.id.toString()
      )
      if (index !== -1) {
        state[index] = action.payload
      }
      saveItemsInLocalStorage(state)
    },
  },
})

const saveItemsInLocalStorage = (state) => {
  localStorage.setItem('items', JSON.stringify(state))
}

export const { addNotes, deleteNotes, editNotes } = takeNotesSlice.actions

export default takeNotesSlice.reducer
