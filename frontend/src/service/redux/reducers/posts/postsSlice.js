import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",

  initialState: {
    posts: []
  },

  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },

  updatePost: (state, action) => {
    state.posts = state.posts.map((elem, i) => {
      if (elem.id === action.payload.id) {
        elem.title = action.payload.title;
        elem.body = action.payload.body;
        
      }
      return elem;
    });
  },

  deletePost: (state, action) => {
    state.posts = state.posts.filter((elem, i) => {
      return elem.id !== action.payload;
    });
  },


});

export const {
  addPost,updatePost,deletePost
} = postsSlice.actions;

export default postsSlice.reducer;
