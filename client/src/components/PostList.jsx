import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../store/postsSlice';

const PostList = () => {
    const dispatch = useDispatch();
    const { items, status, filter } = useSelector((state) => state.posts);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const filteredPosts = items.filter((post) =>
        post.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (status === 'loading' && items.length === 0) return <div className="loader">Loading posts...</div>;
    if (status === 'failed' && items.length === 0) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="post-list">
            {filteredPosts.length === 0 ? (
                <p className="no-posts">No posts found.</p>
            ) : (
                filteredPosts.map((post) => (
                    <div key={post.id} className="glass-card post-item">
                        <div className="post-content">
                            <h3>{post.name}</h3>
                            <p>{post.description}</p>
                        </div>
                        <button
                            className="btn-danger"
                            onClick={() => dispatch(deletePost(post.id))}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
