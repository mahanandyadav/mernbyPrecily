import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const url = 'http://localhost:3001'
// const url = '/api/'
console.log(document.cookie)

function App() {
  const [userId, setUserId] = useState('')
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
            // "Credentials": 'include',
            'Content-Type': 'application/json',
            // 'WithCredentials': true,
          },
          body: JSON.stringify(inputValue)
        })
        if (res.ok) {
          let d = await res.json()
          setUserId(d.user._id)
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

  const handleOnUpdate = (e) => {
    e.preventDefault()
    const addData = async () => {
      try {
        const res = await fetch(`${url}/?id=${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputValue)
        })
        if (res.ok) {
          let d = await res.json()
          console.log(d)
        } else {
          alert('fetch update failed')
        }
      } catch (e) {
        console.log(e)
      }
    }
    addData()
    // setInputValue({})
  }

  let d;
  const handleGetCount = (e) => {
    e.preventDefault()
    const updateFetch = async () => {
      try {
        const res = await fetch(url)
        if (res.ok) {
          d = await res.json()
          console.log(d)
        }
      } catch (e) {
        console.log(e)
      }
    }
    updateFetch()

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
        <label>email</label>
        <input
          name='email'
          onChange={(e) => handleChange(e)}
          value={inputValue.email}
        />
        <button onClick={handleOnAdd}>Add</button>
        <button onClick={handleOnUpdate}>Update</button>
        <button onClick={handleGetCount}>Count</button>
      </form>

    </div>
  )

}

export default App;