import React from 'react'


const Subrender = ({name, number, index, deletePerson}) => {
    return(<>
        <p>{name} {number} <button onClick={() =>deletePerson(index)}>delete</button></p>
    </>)
}

    const Renderingnames = ({array, functio1n}) => {
        return (array.map((person) => (
      <Subrender name={person.name} number={person.number} index={person.id} deletePerson={functio1n}/>
      )
    ))
        }
  

export default Renderingnames;