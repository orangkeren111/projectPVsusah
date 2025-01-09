import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PlayVideo() {
  const params = useParams();  // Log the whole params object

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
    handleLoad()
    }, [])

    const handleLoad = () => {
      window.api.loadMovie().then((data) => {
        setCurrFilm(data.find(x=>x.id == params.id))
        console.log(currFilm);
        
      })
    } 
  return (
    <div style={{marginTop:'10vh', display:"flex", alignItems: "center", gap: "16px"}}>
      <div style={{width:'30vw', backgroundColor:"pink"}}>
        <h1>{currFilm.title}</h1>
        <img src={currFilm.image} alt="" width="240" height="320"/>
        <p>{currFilm.description}</p>
      </div>
      <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${currFilm.videoID}`}
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
