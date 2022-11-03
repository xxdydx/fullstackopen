import { useState, useEffect } from "react";
import personService from './services/connect'
import Content from './components/Content'


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredList, setFilter] = useState(persons);
  const [condition, setCondition] = useState('');
  const [notification, setNotification] = useState (null);
  const [notiftype, setNotiftype] = useState('notif');

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  const Notif = ({ message, type }) => {
    if (message === null) {
      return null
    }
    else if (type === 'error') {
      return (
        <div className='error'>
        {message}
      
      </div>
      )
    }
  
    return (
      <div className='notif'>
        {message}
      
      </div>

      
    )
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };


  const filtering = (event) => {
    setCondition(event.target.value);
    const query = event.target.value
    const filterexp = new RegExp(query, "i");
    const xxxs = persons.filter(function (value) {
      return filterexp.test(value.name);
    });
    setFilter(xxxs);
   
  };
  

  const deletePerson = (id) => {
    const person1 = persons.filter(p => p.id === id)
    const name = person1[0].name

    if(window.confirm(`Do you want to delete ${person1[0].name}?`)) {
    personService
    .remove(id)
      setPersons(persons.filter(person => person.id !== id));
      setFilter(filteredList.filter(person => person.id !== id));
      setNotification(`Successfully deleted ${name}`);
      setTimeout(() => {
        setNotification(null)
      }, 2500)

    }

  }
  const addPerson = (event) => {
    event.preventDefault();
    const checkUsername = (obj) => obj.name === newName;
    if (persons.some(checkUsername)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)){
        const person2 = persons.filter(p => p.name === newName)
        const num = person2[0].id
        const updatedObject = {
          name: newName,
          number : newNumber,
        }
        personService
        .update(num,updatedObject)
        .then(response => {
          setPersons(persons.map(item => item.id === num ? updatedObject : item));
          setFilter(filteredList.concat(response.data));
          setNotification(`Successfully updated ${updatedObject.name}`);
          setTimeout(() => {
            setNotification(null)
          }, 2500)
          setNewNumber("");
          setNewName("");

        })
        .catch(error => {
          setNotiftype('error')
          setNotification(error.response.data.error)
          setTimeout(() => {
            setNotification(null)
            setNotiftype('notif')
          }, 2500)
          
        })


      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setFilter(filteredList.concat(response.data));
        setNotification(`Successfully added ${personObject.name}`);
        setTimeout(() => {
          setNotification(null)
        }, 2500)
        setNewName("");
        setNewNumber("");
      }
      )
      .catch(error => {
        setNotiftype('error')
        setNotification(error.response.data.error)
        setTimeout(() => {
          setNotification(null)
          setNotiftype('notif')
        }, 2500)
        
      })

    }
    
  };
  

  return (
    <div>
      <Notif message = {notification} type={notiftype}/>
      <Content condition ={condition} filtering ={filtering} addPerson ={addPerson} newName ={newName} handleNameChange ={handleNameChange} newNumber ={newNumber} handleNumberChange ={handleNumberChange} persons ={persons} deletePerson={deletePerson} filteredList ={filteredList} />
    </div>
  );

  };

export default App;
