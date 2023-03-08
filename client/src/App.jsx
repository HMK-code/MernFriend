import './App.css'
import {useState, useEffect} from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [friends, setFriends] = useState([]);

  const addFriend = () => {
    axios.post("http://localhost:3001/addfriend", {name: name, age: age})
    .then((response) => {
      setFriends([...friends, {_id: response.data._id ,name: name, age: age}])
    })
  }
  
  const updateFriend = (id) => {
    const newAge = prompt("enter new age: ")

    axios.put("http://localhost:3001/update", {newAge: newAge, id: id})
    .then(() => {
      setFriends(friends.map((val) => {
        return val._id == id ? {_id: id, name: val.name, age: newAge} : val
      }))
    })
  }

  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      setFriends(friends.filter((val) => {
        return val._id != id;
      }))
    })
  }


  useEffect(() => {
    axios.get("http://localhost:3001/read")
    .then((response) => {
      setFriends(response.data)
    })
    .catch(() => {
      console.log("err");
    })
  },[])

  return (
    <div className="App">
      <div className='inputs'>
      <input type="text" placeholder='name' onChange={(event) => {
        {setName(event.target.value)}
      }} />
      <input type="number"  placeholder='age' onChange={(event) => {
        {setAge(event.target.value)}
      }} />
      <button onClick={addFriend}>Add Friend</button>
      </div>
      {friends.map((val) => {
        return (
        <div className='info'>
          <div className='content'>     
            {val.name} {val.age}
            <button onClick={() => {updateFriend(val._id)}}>düzenle</button>   
            <button onClick={() => {deleteFriend(val._id)}}>sil</button>   
          </div>
        </div>
      )})}
    </div>
  )
}

export default App
