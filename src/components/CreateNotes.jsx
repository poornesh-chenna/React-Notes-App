import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNotes } from '../redux/takeNotesSlice'
import { nanoid } from '@reduxjs/toolkit'
import { GrAdd } from 'react-icons/gr'
import { FaBold } from 'react-icons/fa'
import { GoItalic } from 'react-icons/go'

function CreateNotes({ setnotes }) {
  const dispatch = useDispatch()
  const [note, setnote] = useState({
    title: '',
    content: '',
    styles: '',
  })
  function handleChange(event) {
    const { name, value } = event.target
    setnote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      }
    })
  }

  function addNote(event) {
    event.preventDefault()
    if (!note.title) {
      alert('Please enter a title')
      return
    }
    if (!note.content) {
      alert('Please enter the content')
      return
    }
    dispatch(addNotes({ ...note, id: nanoid() }))
    setnote({
      title: '',
      content: '',
      styles: '',
    })
  }
  const handleToggleBold = () => {
    setnote((prevNote) => ({
      ...prevNote,
      styles: toggleStyle(prevNote.styles, 'font-bold'),
    }))
  }

  const handleToggleItalic = () => {
    setnote((prevNote) => ({
      ...prevNote,
      styles: toggleStyle(prevNote.styles, 'italic'),
    }))
  }

  const toggleStyle = (styles, styleToToggle) => {
    styles = styles || ''

    return styles.includes(styleToToggle)
      ? styles.replace(styleToToggle, '').trim()
      : `${styles} ${styleToToggle}`.trim()
  }

  return (
    <div>
      <form className="relative w-5/6 md:w-1/2 p-4 rounded-md shadow-md mx-auto mt-8 my-12 border">
        <input
          className="text-3xl font-inherit w-full border-0 p-2 outline-none"
          onChange={handleChange}
          value={note.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          className={`text-xl font-inherit w-full border-0 p-2 outline-none ${note.styles}`}
          onChange={handleChange}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <div className="flex gap-3">
          <div onClick={handleToggleBold}>
            <FaBold />
          </div>
          <div onClick={handleToggleItalic}>
            <GoItalic />
          </div>
        </div>
        <button
          className="absolute right-8 -bottom-5 bg-amber-400 hover:bg-yellow-500 rounded-md border-0 text-white w-10 h-10 shadow-lg flex justify-center items-center outline-none"
          onClick={addNote}
        >
          <GrAdd className="text-3xl p-1 hover:text-4xl" />
        </button>
      </form>
    </div>
  )
}

export default CreateNotes
