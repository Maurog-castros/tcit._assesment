import React from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import PostFilter from './components/PostFilter';

function App() {
    return (
        <div className="container">
            <header className="header">
                <h1>Posts Management</h1>
                <p>Full-stack React & Node.js Application</p>
            </header>
            <main className="main-content">
                <div className="left-panel">
                    <PostForm />
                </div>
                <div className="right-panel">
                    <PostFilter />
                    <PostList />
                </div>
            </main>
        </div>
    );
}

export default App;
