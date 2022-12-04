import { useSelector, useDispatch } from 'react-redux'
import {create} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


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
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
        </div>

    )
}

export default AnecdoteForm