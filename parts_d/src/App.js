import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, all}) => {
  const average = Math.round(((good-bad)/all) * 10) / 10;
  const positive = Math.round(((good)/all)*100 * 10) / 10;
  if(all === 0){
    return ( 
        <p>No feedback given</p>
    )
  }

  else{
    return (
      <table>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={`${positive} %`} /> 
      </table>
    )
  }

}

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td> 
      </tr>
    </tbody>
    
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all+1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all+1)
  }

  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [points, setPoints] = useState([
      0,0,0,0,0,0,0
    ])

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    const max = Math.max(...copy)
    const index = copy.indexOf(max)
    setMostVotes(index)
  }

  

  
  

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={handleGoodClick} text='good' />
        <Button handleClick={handleNeutralClick} text='neutral' />
        <Button handleClick={handleBadClick} text='bad' />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      <h1>Anecdotes of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * (6 - 0)) + 0)}>next anecdote</button>
      </div>
      <h1>Anecdotes with most votes</h1>
      <div>{anecdotes[mostVotes]}</div>
    </div>
  )
}

export default App