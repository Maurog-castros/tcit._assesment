import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/postsSlice';

const PostForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { status, error } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        const resultAction = await dispatch(addPost({ name, description }));
        if (addPost.fulfilled.match(resultAction)) {
            setName('');
            setDescription('');
        }
    };

    return (
        <form className="glass-card post-form" onSubmit={handleSubmit}>
            <h2>Create New Post</h2>
            {error && (
                <div className="error-message">
                    {typeof error === 'object' ? error.message : error}
                </div>
            )}
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
            <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Inserting...' : 'Insert'}
            </button>
        </form>
    );
};

export default PostForm;
