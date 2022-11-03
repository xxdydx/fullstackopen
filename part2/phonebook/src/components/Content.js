import React from 'react'
import Renderingnames from './Renderingnames'

const Content = ({filtering, addPerson, newName, handleNameChange, newNumber, handleNumberChange, persons, deletePerson, filteredList, condition}) => {
    return (
        <div>
        <h2>Phonebook</h2>
        <div>
          filter shown with <input onChange={filtering} />
        </div>
        <h2>Add a New</h2>
        <form onSubmit={addPerson}>
          <div>
            name:
            <input value={newName} onChange={handleNameChange} />
          </div>
  
          <div>
            number:
            <input value={newNumber} onChange={handleNumberChange} />
          </div>
  
          <div>
            <button type="submit">add</button>
          </div>
        </form>
  
        <h2>Numbers</h2>
        <ul>
      { condition === ''
      ? <Renderingnames array={persons} functio1n={deletePerson} />
      : <Renderingnames array={filteredList} functio1n={deletePerson}/>
      
  
  
    }
  
        </ul>
        </div>
    )
}

export default Content;