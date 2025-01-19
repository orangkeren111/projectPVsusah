import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserProvider({ children }){
  const [user, setUser] = useState({
    username: '',
    password: '',
    name:'',
    subscribed:''
  });
  const [users, setUsers] = useState([])
  useEffect(()=>{
      handleLoad()
  }, [])
  const handleSave = () => {
    window.api.save(users)
  }

  const handleLoad = () => {
    window.api.load().then((data) => {
      setUsers(data)
      console.log(data)
    })
  }

  const login = (username, password) => {
    // tambahanku cuman disini
    // if (username=== "admin@gmail.com" && password==="admin") {
    //   setUser((user) => ({
    //     ...user,
    //     username: username,
    //     password: password,
    //   }));
    //   console.log(user)
    //   return 1
    // }
    const currUser = users.find(user => user.username === username && user.password === password)
    if (currUser){
      //login success
      setUser(currUser);
      return true
    } else{
      //login failed
      return false
    }
  };
  
  const logout = () => {
    setUser({ username: '', password: '', name:'', subscribed:'' });
  };

  const signUp = (username, password, name)=>{
    const currUser = users.find(user => user.username === username)
    if (currUser){
      //signup failed
      return false
    } else{
      //signup success
      users.push({ username: username, password: password, name: name, subscribed:"" })
      handleSave(users)
      setUser(users[users.length-1]);
      return true
    }
  }

  const updateSubscribe = ()=>{
    let newUser = user
    newUser.subscribed = "yes"
    setUser(newUser)
    handleSave(users)
  }
  return (
    <UserContext.Provider value={{ user, login, logout, signUp, updateSubscribe }}>
      {children}
    </UserContext.Provider>
  );
};