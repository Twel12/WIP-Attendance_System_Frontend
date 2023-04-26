import {useState} from 'react';
import './Home.css';

export default function Home() {
    const [count, setCount] = useState(0);
    
    return (
        <div className="Home">
        <div className="lander">
            <h1>Home</h1>
            <p className="text-muted">A simple example of React</p>
        </div>
        </div>
    );
    }
