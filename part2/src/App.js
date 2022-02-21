import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

function App() {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(existingNotes => {
                setNotes(existingNotes)
            })
    }, [])

    useEffect(() => {
        const userJSON = window.localStorage.getItem('user')
        if (userJSON) {
            const user = JSON.parse(userJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
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

    async function handleLogin(event) {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.location.setItem('user', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    function loginForm() {
        return (
            <form onSubmit={handleLogin}>
                <p>username<input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} /></p>
                <p>password<input type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} /></p>
                <button type="submit">login</button>
            </form>
        )
    }

    function noteForm() {
        return (
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        )
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            {user === null ? loginForm() : <p>{user.name}</p>}

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important only" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
            </ul>

            {user !== null && noteForm()}
        </div>
    )
}

export default App
