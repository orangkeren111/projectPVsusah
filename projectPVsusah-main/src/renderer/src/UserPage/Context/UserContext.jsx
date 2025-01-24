import React, { useCallback, useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export default function UserProvider({ children }){
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState([]);

  // useEffect(() => {
  //   window.api.loadMovie().then((data) => {
  //     setFilm(data)
  //     setSearchData(data)
  //   })
  // }, [])

  const [film, setFilm] = useState([]);
  useEffect(() => { 
    loadfilm()
  }, [])



  const [profile, setProfile] =useState(false)

  const loadfilm = () =>{
      window.api.loadMovie().then((data) => {
      setFilm(data)
      setSearchData(data)
    })
  }

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
      loadfilm()
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
      loadfilm()
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

  const search = (inputSearch) => {
    console.log("Search Input: ", inputSearch);
    let temp = [];
    if (inputSearch === "") {
      setSearchData(film);
      console.log("Reset Search Data: ", film);
    } else {
      film.forEach((data) => {
        if (data.title.toLowerCase().includes(inputSearch)) {
          temp.push(data);
        }
      });
      setSearchData(temp);
      console.log("Filtered Data: ", temp);
    }
  };

  const searchGenre = (genre) => {
    let temp = []
    if(genre === "All"){
      temp = film
    }
    else{
      film.forEach((data) => {
        if(data.genre.includes(genre)){
          temp.push(data)
        }
      })
    }
    setSearchData(temp);
  }

  return (
    <UserContext.Provider value={{ user, login, logout, signUp, updateSubscribe, search, film, searchData, setSearchData, searchGenre, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};