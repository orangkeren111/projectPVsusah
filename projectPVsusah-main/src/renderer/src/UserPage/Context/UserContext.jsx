import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export default function UserProvider({ children }){
  const navigate = useNavigate();

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
    if (username=== "admin@gmail.com" && password==="admin") {
      setUser((user) => ({
        ...user,
        username: username,
        password: password,
        name: "admin",
      }));
      navigate('/dashboard')
      console.log(user)
      return true
    }
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

  // Search Filter
  // const [inputSearch, setInputSearch] = useState("");
  // useEffect(() => {
  //   window.api.getFilm().then((data) => {
  //     setFilm(data)
  //   })
  // })
  // const [film, setFilm] = useState([]);
  const search = (inputSearch) => {
    let temp = []
    film.map((data, idx)=>{
      if(data.genre.includes(inputSearch)){
        temp.push(data)
      }
    })
  }

  const [film, setFilm] = useState([]);
  useEffect(() => {
    window.api.loadMovie().then((data) => {
      setFilm(data)
    })
  })

  return (
    <UserContext.Provider value={{ user, login, logout, signUp, updateSubscribe, search, film }}>
      {children}
    </UserContext.Provider>
  );
};