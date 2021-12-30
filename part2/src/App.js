import React, { useState } from 'react'
import Note from './components/Note'

function App({notes}) {
    const [dNotes, setDNotes] = useState(notes)
    const [newNote, setNewNote] = useState("Enter note here...")
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll ? dNotes : dNotes.filter((note) => note.important === true)

    function addNote(event) {
        event.preventDefault()
        const note = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: dNotes.length + 1
        }
        setDNotes(dNotes.concat(note))
        setNewNote("")
    }

    function handleNoteChange(event) {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    return (
      <div>
          <h1>Notes</h1>
          <div>
              <button onClick={() => setShowAll(!showAll)}>
                  show {showAll ? "important" : "all"}
              </button>
          </div>
          <ul>
              {notesToShow.map(note => <Note key={note.id} note={note} />)}
          </ul>
          <form onSubmit={addNote}>
              <input value={newNote} onChange={handleNoteChange} />
              <button type="submit">save</button>
          </form>
      </div>
    )
}

export default App
