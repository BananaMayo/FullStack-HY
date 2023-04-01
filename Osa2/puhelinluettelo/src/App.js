import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = ({filterChange}) => {
  return(
      <div>
          filter shown with <input onChange={filterChange}/>
      </div>
  )
}

const PersonForm = ({name,number, nameEvent, numberEvent, add}) => {
  return(<div>
    <form onSubmit={add}>
        <div>
          name: <input value={name}onChange={nameEvent}/>
        <br></br>
          number: <input value={number}onChange={numberEvent}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}

const Persons = ({persons, remove}) => {
  return(
  <div>
    {persons.map(variable => <div> 
    <form onSubmit={remove}>
      {variable.name} {variable.number}
      <input type='hidden' name='id' value={variable.id} />
      <input type='hidden' name='name' value={variable.name} />
      <button>Delete</button>
    </form></div>)}
  </div>)}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
 
  useEffect(() => { 
   console.log('effect')
    personService.getAll().then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const [filteredList, setFilterList] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  const addName = (event) => { 
    event.preventDefault()  
    if(persons.filter(x => x.name.toLowerCase() == newName.toLowerCase()).length>0){
     if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const object = persons.find(variable => variable.name == newName)
      const updatedObj = { name: object.name, number: newNumber,  id: object.id}
      console.log(updatedObj)
     
      personService.update(updatedObj).then(response =>
       {setPersons(persons.map(variable => variable.name !== newName ? variable : response.data))})
     }
     return
   }
    console.log('button clicked', event.target) 
    const phoneObj = { name: newName, number:newNumber, id:persons.length+1} 

  personService.create(phoneObj).then(response => {
    setErrorMessage(`Added ${newName}`)
    setTimeout(()=> {setErrorMessage(null)}, 3000)
    setPersons(persons.concat(phoneObj))
    setNewName("")
    setNewNumber("")
    setShowAll(true)
   })
}


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    if(event.target.value != ''){
      const filtered = persons.filter(variable => variable.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilterList(filtered)
      setShowAll(false)
    }
    else {setShowAll(true)
    }
    
  }

  const Remove = event => {
    event.preventDefault()
    if(window.confirm(`Delete ${event.target.name.value} ?`)){
      console.log(event.target.id.value)
      const person = persons.find(x => x.id == event.target.id.value)
      personService.remove(event.target.id.value).then(response => {
        setShowAll(true)
        console.log(response)
        window.location.reload(true);
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />

      <Filter filterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} nameEvent={handleNameChange} numberEvent={handleNumberChange} add={addName} />

      <h2>Numbers</h2>
      <Persons persons={showAll ? persons:filteredList } remove={Remove}/>
        
    </div>
  )
}

export default App
