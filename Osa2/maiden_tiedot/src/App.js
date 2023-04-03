import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState()
  const [country, setCountry] = useState(null)
  const [tooManyMatches, setTooMany] = useState(false)

  // useEffect(() => {
  //   console.log('effect run, country is now', country)

  //   // skip if currency is not defined
  //   if (country) {
  //     console.log('fetching country data...')
  //     axios
  //       .get(`https://restcountries.com/v3.1/all`)
  //       .then(response => {
  //         setData(response.data)
  //       })
  //   }
  // }, [country])

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
    setCountry(value)
    if(event.target.value == ''){
      setData()
      setTooMany(false)
      return
    }
    axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          const countries = response.data.filter(variable => variable.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
          setData(countries)

          if(countries.length>10){
          setTooMany(true)
          return
        }
        setTooMany(false)
        })
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <pre>
        { tooManyMatches ? "Too many matches, specify another filter":
      <div> 
        {data ? data.map(variable => <p>{variable.name.common}</p>) : ""}
      </div>}
      </pre>
    </div>
  )
}

export default App