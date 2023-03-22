import { useState } from 'react'

const StatisticLine = ({text, value}) =>(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr> 
)

const Stats = (props) => {
  if (props.Total == 0) {
    return (
      <div>
        <strong>
        No feedback given
        </strong>
      </div>
    )  
  }  
  return( 
    <div>
      <table>
        <StatisticLine text="Good" value={props.Good} />
        <StatisticLine text="Neutral" value={props.Neutral} />
        <StatisticLine text="Bad" value={props.Bad} />
        <StatisticLine text="Total" value={props.Total} />
        <StatisticLine text="Average" value={(props.Good-props.Bad)/props.Total} />
        <StatisticLine text="Poaitive" value={((props.Good)/props.Total*100).toString().concat("%")} />
      </table>
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}  
  </button>
)

const App = () => {
  const [Good, setGood] = useState(0)
  const [Neutral, setNeutral] = useState(0)
  const [Bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const [Total, setTotal] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = Good + 1
    setGood(updatedGood)
    setTotal(updatedGood + Neutral + Bad)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = Neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + Good + Bad)
  }

  const handleBadClick = () => {
    const updatedBad = Bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + Neutral + Good)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      
      <h1>statistics</h1>
      <Stats Good={Good} Neutral={Neutral} Bad={Bad} Total={Total} />
    </div>
  )
}
export default App
