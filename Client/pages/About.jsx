import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <h1>About KiloGram</h1>
      <p>
        KiloGram is a photo-sharing social media app that enables users to
        connect and share moments effortlessly. Built with hardwork and
        creativity by <b>Joel Mark Joseph</b> and <b>Harshini</b>, this platform
        combines innovation with user-friendly features.
      </p>

      <div className="about-creators">
        <div className="creator-profile">
          <h2>Joel Mark Joseph</h2>
          <img
            src="https://joelmarkjoseph.netlify.app/reminine.jpg"
            alt="Joel Mark Joseph"
          />
          <p>
            Joel is a passionate developer with a strong foundation in
            full-stack development. He has contributed to projects like Vitspace
            and Campus-Computer-Control, earning global recognition in coding
            and academic excellence.
          </p>
          <a
            href="https://joelmarkjoseph.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Joel
          </a>
        </div>

        <div className="creator-profile">
          <h2>Harshini</h2>
          <img
            src="https://joelmarkjoseph.netlify.app/reminiedharshi.jpg"
            alt="Harshini"
          />
          <p>
            Harshini is an innovative and creative thinker who has been
            instrumental in shaping the user experience of KiloGram. She brings
            unique design insights and plays a key role in the success of the
            platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
