<<<<<<< HEAD
import { useSelector, useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";
import { create, createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
=======
import { useSelector, useDispatch } from 'react-redux'
import {create} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    const notification = {
      message: "New anecdote added",
      type: "success",
    };
    dispatch(setNotification(notification, 2500));
  };

<<<<<<< HEAD
  return (
    <div>
      <h2>create new</h2>
=======
 const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(anecdote))
        const notification = {
          message: 'New anecdote added',
          type: 'success'
        }
        dispatch(setNotification(notification, 2500))
      }
    

    return (
        <div>
     <h2>create new</h2>
>>>>>>> parent of 820e2f2 (completed 6.13-6.14)
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
