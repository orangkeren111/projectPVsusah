import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function PlayVideo() {
  const params = useParams();  // Log the whole params object
  const { film } = useContext(UserContext);
  const [currFilm, setCurrFilm]  = useState(
    {
      "id":"",
      "title": "",
      "released": "",
      "description": "",
      "image": "",
      "videoID": ""
    }
  );

  useEffect(()=>{
    setCurrFilm(film.find(x=>x.id == params.id))
  }, [])

  // const handleLoad = () => {
  //   window.api.loadMovie().then((data) => {
  //     setCurrFilm(data.find(x=>x.id == params.id))
  //     console.log(currFilm);
  //   })
  // }
  return (
    <div style={{marginTop:'15vh', display:"flex", alignItems: "center", gap: "16px", zIndex: "2"}}>
      <div style={{width:'40%',
                  color: "white",
                  padding: "15px 40px 30px",
                  background: "linear-gradient(90deg, rgba(41,41,41,1) 0%, rgba(128,128,128,1) 35%, rgba(255,255,255,0.1) 100%)"}}>
        <h1 style={{fontSize: "40px", fontWeight: "700"}}>{currFilm.title}</h1>
        <img src={currFilm.image} alt="" width="500" height="520" style={{margin: "20px 0px"}}/>
        <p style={{width: "100%"}}>{currFilm.description}</p>
      </div>
      <div>
      <iframe
        width="720"
        height="480"
        src={`https://www.youtube.com/embed/${currFilm.videoID}?autoplay=1&&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      </div>
      
      
    </div>
  );
}

export default PlayVideo;
