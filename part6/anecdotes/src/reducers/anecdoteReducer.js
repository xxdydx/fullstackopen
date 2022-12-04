import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    edit(state, action) {
      const anecdoteToChange = action.payload;
      return state.map((a) =>
        a.id !== anecdoteToChange.id ? a : anecdoteToChange
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { create, edit, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(create(newAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote);
    dispatch(edit(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;
