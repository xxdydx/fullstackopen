<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

=======
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
=======
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const updatedAnecdote  = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : updatedAnecdote 
      )

    case 'CREATE':
      return [...state, action.data]
      default:
        return state
     }
  }


  export const vote = (id) => {
    return {
      type: 'VOTE',
      data: {id}
<<<<<<< HEAD
<<<<<<< HEAD
    }
  }
  export const create = (anecdote) => {
    return {
      type:'CREATE',
      data: {
        content: anecdote,
        id:getId(),
        votes:0
      }
    }
  }
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)

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
=======
    }
  }
  export const create = (anecdote) => {
    return {
      type:'CREATE',
      data: {
        content: anecdote,
        id:getId(),
        votes:0
      }
    }
  }
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
=======
    }
  }
  export const create = (anecdote) => {
    return {
      type:'CREATE',
      data: {
        content: anecdote,
        id:getId(),
        votes:0
      }
    }
  }
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)

<<<<<<< HEAD
export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.update(anecdote);
    dispatch(edit(votedAnecdote));
  };
};

<<<<<<< HEAD
<<<<<<< HEAD
export default anecdoteSlice.reducer;
=======
export default reducer
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
=======
export default reducer
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
=======
export default reducer
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
