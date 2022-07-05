import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const url = 'http://localhost:3001'

function App() {
  const [inputValue, setInputValue] = useState({
    name: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  const handleOnAdd = (e) => {
    e.preventDefault()
    console.log(document.cookie)
    const addData = async () => {
      try {
        const res = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            "mode": 'cors',
            "Credentials": 'include',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'WithCredentials': true,
          },
          body: JSON.stringify(inputValue)
        })
        if (res.ok) {
          let d = await res.json()
          console.log(d)
        } else {
          alert('fetch add failed')
        }
      } catch (e) {
        console.log(e)
      }
    }
    addData()
    // setInputValue({})
  }
  return (
    <div>
      <h1>session with mongodb</h1>
      <form className='form' >
        <label>name</label>
        <input
          name='name'
          onChange={(e) => handleChange(e)}
          value={inputValue.name}
        />
        <button onClick={handleOnAdd}>Add</button>
      </form>

    </div>
  )
}

export default App;
