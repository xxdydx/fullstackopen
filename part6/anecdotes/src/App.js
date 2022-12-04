import { useSelector, useDispatch } from 'react-redux'
import {vote,create} from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {

  return (
    <div>
          <Notification />
          <Filter />

      <h2>Anecdotes</h2>
    <AnecdoteList />
    <AnecdoteForm />

    </div>
  )
}

export default App