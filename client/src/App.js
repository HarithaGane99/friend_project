import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
//HarithaGane99
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);


  const addFriend = () => {
    Axios.post('http://localhost:3001/addfriend', { 
      name: name, 
      age: age,
    }).then(()=>{
      setListOfFriends([...listOfFriends,{name:name,age:age}]);
    })
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setListOfFriends(response.data);
    }).catch(() => {
      console.log("error");
    });
  }, []);

  const updateFriend=(id)=>{
    const newAge = prompt('Enter New Age:');
    Axios.put('http://localhost:3001/update',{newAge : newAge, id:id});
  };

  return (
    <div className="App">
      <div className="inputs">
        <input type="text" placeholder='Friend name...' onChange={(event) => {
          setName(event.target.value)
        }} />
        <input type="number" placeholder='Friend age...' onChange={(event) => {
          setAge(event.target.value)
        }} />
        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className='ListOfFriends'>
      {listOfFriends.map((val)=>{
        return (
          <div className='friendsContainer'>
            <div className='friend'>
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
            </div>
            
          </div>
        

        )

      })}
      </div>
    </div>
  );
}

export default App;
