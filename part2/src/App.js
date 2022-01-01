import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

function App() {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        noteService
            .getAll()
            .then(existingNotes => {
                setNotes(existingNotes)
            })
    }, [])

    const notesToShow = showAll ? notes : notes.filter((note) => note.important === true)

    function addNote(event) {
        event.preventDefault()
        const note = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }

        noteService
            .create(note)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote("")
            })
    }

    function handleNoteChange(event) {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    function toggleImportanceOf(id) {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(`Note '${note.content}' was already removed from the server`)
                setTimeout(() => setErrorMessage(null), 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
      <div>
          <h1>Notes</h1>
          <Notification message={errorMessage} />
          <div>
              <button onClick={() => setShowAll(!showAll)}>
                  show {showAll ? "important only" : "all"}
              </button>
          </div>
          <ul>
              {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
          </ul>
          <form onSubmit={addNote}>
              <input value={newNote} onChange={handleNoteChange} />
              <button type="submit">save</button>
          </form>
      </div>
    )
}

export default App
