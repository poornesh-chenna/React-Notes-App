import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNotes } from '../redux/takeNotesSlice'
import Note from './NoteModal'
import { MdDelete } from 'react-icons/md'

function Notes() {
  const notes = useSelector((state) => state.notes)
  const [isOpen, setisOpen] = useState(false)
  const [selctedNote, setselctedNote] = useState()

  const dispatch = useDispatch()
  const handleDeleteNote = (idx) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this note?'
    )

    if (isConfirmed) {
      dispatch(deleteNotes(idx))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 m-4">
      {notes.length > 0 &&
        notes.map((note, idx) => (
          <div
            key={idx}
            className="relative rounded-md shadow-md shadow-gray-300 p-4 cursor-pointer border"
          >
            <div
              onClick={() => {
                setselctedNote(note)
                setisOpen(!isOpen)
              }}
            >
              <h1 className="text-2xl mb-2">{note.title}</h1>
              <p
                className={`text-md mb-2 text-pretty break-words ${note.styles}`}
              >
                {note.content}
              </p>
            </div>
            <button
              className="absolute -bottom-4 right-3 outline-none border rounded "
              onClick={() => handleDeleteNote(idx)}
            >
              <MdDelete className="text-3xl text-amber-400 hover:text-4xl bg-slate-100 shadow-lg rounded" />
            </button>
          </div>
        ))}
      {isOpen && <Note setisOpen={setisOpen} selectedNote={selctedNote} />}
    </div>
  )
}
export default Notes
