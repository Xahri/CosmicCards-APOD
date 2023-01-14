import React, { useState, useEffect, useRef } from "react";
import VanillaTilt from 'vanilla-tilt';

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);
  const [link, setLink] = useState(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)

  const randomDate = ((start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
  })

  const randomPic = (() => {
    const date = randomDate(new Date(1996, 1, 1), new Date()); // Must be after 1995-06-16
    // console.log(date);
    setLink(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
  })

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch( link );
      const data = await res.json();
      if (data.media_type !== "image"){
        // console.log("Found a Video");
        randomPic();
      }
      else{
        setPhotoData(data);
        // console.log(data);
      }
    }
  }, [link]);

  if (!photoData){
    return <p>Loading....</p>;
  }

  const options = {
    scale: 1,
    speed: 400,
    glare: true,
    "max-glare": 0.06,
    // reset: true,
    max: 4
  };

  function Tilt(props) {
    const { options, ...rest } = props;
    const tilt = useRef(null);
  
    useEffect(() => {
      VanillaTilt.init(tilt.current, options);
    }, [options]);
  
    return <div ref={tilt} {...rest} />;
  }

  return (
    <>
      <Tilt className="card" options={options}>
        <div className="nasa-photo">
          <img
            src={photoData.url}
            alt={photoData.title}
            className="photo"
          />
          <div>
            <h1>{photoData.title}</h1>
            <p className="date">{photoData.date}</p>
            <p className="explanation">{photoData.explanation}</p>
          </div>
        </div>
      </Tilt>
      <button className="Btn" onClick={randomPic}>Randomize</button>
    </>
  );
}