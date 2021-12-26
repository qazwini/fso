import React, { useState } from 'react'

function History({allClicks}) {
    if (allClicks.length === 0) {
        return (
            <div>the app is used by pressing the buttons</div>
        )
    } else {
        return (
            <div>button press history: {allClicks.join(" ")}</div>
        )
    }
}

function Button({text, onClick}) {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

function App() {
    const [ leftCount, setLeft ] = useState(0)
    const [ rightCount, setRight ] = useState(0)
    const [ allClicks, setAllClicks ] = useState([])

    function leftPress() {
        setLeft(leftCount + 1)
        setAllClicks(allClicks.concat("L"))
    }

    function rightPress() {
        setRight(rightCount + 1)
        setAllClicks(allClicks.concat("R"))
    }

    function hello(who) {
        return function() {
            console.log("hello", who)
        }
    }

    return (
        <div>
            <h1>Hello!</h1>
            <Button text="left" onClick={leftPress} />
            <Button text="right" onClick={rightPress} />
            <Button text="click here!" onClick={hello("mama")} />
            <History allClicks={allClicks} />
        </div>
    )
}

export default App
