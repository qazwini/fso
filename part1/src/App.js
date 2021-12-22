import React from 'react'

function bornYear(age) {
    const yearNow = new Date().getFullYear();
    return yearNow - age;
}

function Hello(props) {
    const { name, age } = props
    const now = new Date();
    return (
        <div>
            <p>Hello {name} ({age}, AKA {bornYear(props.age)})! It is now {now.toString()}.</p>
        </div>
    );
}

function HelloV2({name, age}) {
    const now = new Date();
    return (
        <div>
            <p>Hello {name} ({age}, AKA {bornYear(age)})! It is now {now.toString()}.</p>
        </div>
    );
}

function App() { 
    console.log("nya~");
    const age = 38;
    return (
        <>
            <h1>Greetings.</h1>
            <Hello name="Jeff" age={age} />
            <Hello name="Joe" age={21 + 7} />
            <HelloV2 name="Mama" age={age / 2} />
        </>
    );
}

export default App;
