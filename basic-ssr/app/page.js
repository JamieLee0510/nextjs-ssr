import React, { useState } from "react";

export default function MyApp() {
    const [count, setCount] = useState(0);
    const clickHandler = ()=>{
        console.log("click!")
        setCount(pre => pre + 1)
    }
    return (
        <div>
            <h1>Counters {count} times</h1>
            <button onClick={clickHandler}>Click me</button>
        </div>
    );
}
