import React, { useState, useEffect } from 'react';

function App() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/profile', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUsername(data.username));
    }, []);

    return (
        <div>
            <header>
                {username ? (
                    <span>Привет, {username}!</span>
                ) : (
                    <a href="/login">Вход / Регистрация</a>
                )}
            </header>
            {/* Остальной код страницы */}
        </div>
    );
}

export default App;