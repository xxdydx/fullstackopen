import { useSelector, useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'
import {create} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


 const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(create(newAnecdote))
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