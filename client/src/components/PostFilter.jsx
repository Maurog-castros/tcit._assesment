import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/postsSlice';

const PostFilter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.posts.filter);

    return (
        <div className="glass-card filter-container">
            <input
                type="text"
                placeholder="Search posts by name..."
                value={filter}
                onChange={(e) => dispatch(setFilter(e.target.value))}
                className="filter-input"
            />
        </div>
    );
};

export default PostFilter;
