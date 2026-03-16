import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || 'Failed to fetch posts');
    }
});

export const addPost = createAsyncThunk('posts/addPost', async (post, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, post);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || 'Failed to add post');
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data || 'Failed to delete post');
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        filter: '',
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter((post) => post.id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload || action.error.message;
                }
            );
    },
});

export const { setFilter } = postsSlice.actions;

export default postsSlice.reducer;
