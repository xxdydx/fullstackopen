import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create (state, action) {
      const anecdote = action.payload
      state.push(anecdote)

    },
    vote (state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const updatedAnecdote  = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : updatedAnecdote 
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {create, vote, setAnecdotes} = anecdoteSlice.actions


export default anecdoteSlice.reducer