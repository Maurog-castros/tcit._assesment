import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postsSlice';

const PostForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(addPost({ name, description }));
        setName('');
        setDescription('');
    };

    return (
        <form className="glass-card post-form" onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Post Title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit" className="btn-primary">Insert</button>
        </form>
    );
};

export default PostForm;
