import { useState } from 'react'

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

const Persons = ({persons}) => {
  return(
  <div>
    {persons.map(variable => <p>{variable.name} {variable.number}</p>)}
  </div>)}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
 
  const [filteredList, setFilterList] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addName = (event) => {
    event.preventDefault()
    if(persons.filter(variable => variable.name.toLowerCase() == newName.toLowerCase()).length>0){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const phoneObject = {name: newName, number: newNumber}

    console.log('button clicked', event.target)
    setPersons(persons.concat(phoneObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm name={newName} number={newNumber} nameEvent={handleNameChange} numberEvent={handleNumberChange} add={addName} />

      <h2>Numbers</h2>
        <Persons persons={showAll ? persons:filteredList }/>
        
    </div>
  )
}

export default App
