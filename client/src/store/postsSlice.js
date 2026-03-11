import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
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
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter((post) => post.id !== action.payload);
            });
    },
});

export const { setFilter } = postsSlice.actions;

export default postsSlice.reducer;
