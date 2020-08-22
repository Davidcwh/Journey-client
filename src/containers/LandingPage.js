import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import { getRandomVideo } from '../clients/pexelClient';

export default function LandingPage() {
  const [backgroundVideo, setBackgroundVideo] = useState(null);

  useEffect(() => {
    getRandomVideo('travel')
      .then(video => setBackgroundVideo(video))
  }, [])

  return (
    <section className="wrapper">
      {
        backgroundVideo ? (
          <div className="video-wrap">
          <video poster={backgroundVideo.image} autoPlay muted loop preload="auto">
            {backgroundVideo.video_files.map(video => {
              return <source src={video.link} type={video.file_type}></source>
            })}
            
          </video>
          </div>
        ) : null
      }

      <div className="overlay"></div>
      <div className="ui text container landing-text">
          <h1 className="ui inverted header">Journey</h1>
          <h2>A Visualized Travel Journal</h2>
          <div className="ui inverted">
            <Link className="buttonLinks" to="/signup">
              <button className="ui big inverted button">Sign Up</button>
            </Link>
          
            <Link className="buttonLinks" to="/login">
              <button className="ui big inverted button">Log in</button>
            </Link>
            </div>
      </div>

    </section>
  )
}