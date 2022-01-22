import { useState, useRef, useEffect } from "react";
import { baseUrl } from "../../config";
import "./Footer.css";

const Footer = ({ trackIndex, audioList }) => {
  const [slideUp, setSlideUp] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(trackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const {
    title = "",
    artist = "",
    avatar = "",
    audioFile = "",
  } = currentTrackIndex !== -1 ? audioList[currentTrackIndex] : {};
  const audioSrc = `${baseUrl}/${audioFile}`;
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
    }, 1000);
  };

  const onChangeTrackProgress = (e) => {
    setTrackProgress(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const nextTrack = () => {
    if (currentTrackIndex < audioList.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
      setTrackProgress(0);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex) {
      setCurrentTrackIndex((prevIndex) => prevIndex - 1);
      setTrackProgress(0);
    } else {
      setCurrentTrackIndex(audioList.length - 1);
    }
  };

  useEffect(() => {
    console.log({ audioFile });
    clearInterval(intervalRef.current);
    setCurrentTrackIndex(trackIndex);
  }, [trackIndex, audioFile]);

  useEffect(() => {
    if (currentTrackIndex !== -1) {
      // if a music is already playing then we will stop it and assign currently selected one
      audioRef.current.pause();
      // new audio initialize
      audioRef.current = new Audio(audioSrc);
      //playing initialize audio
      audioRef.current.play();
      // set isPlaying true when music started playing
      setIsPlaying(true);
      // start progress of the audio
      startTimer();
    }

    //setCurrentTrackIndex(trackIndex);
  }, [currentTrackIndex, audioSrc]);

  useEffect(() => {
    // if user press play button then we will play the currently selected music
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      // if user press pause button then we will pause the currently playing music
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const duration = audioRef.current.duration;

  const currentProgress = (trackProgress / duration) * 100;
  const trackProgressStyling = `linear-gradient(to right, #ffffff ${currentProgress}%, grey ${currentProgress}%)`;

  return (
    <div className={`footer ${slideUp ? "active" : ""}`}>
      <div onClick={() => setSlideUp(!slideUp)} className="slide-up"></div>
      <div className="d-visibility"></div>

      {slideUp && (
        <div className="audio-player">
          <div className="audio-cover-img">
            <img alt="" />
          </div>

          <div className="audio-player-info">
            <p className="audio-player-song">{title}</p>
            <p className="audio-player-artist">{artist}</p>
          </div>

          <div className="audio-player-progress">
            <input
              type="range"
              min={0}
              step={"1"}
              max={duration ? duration : 0}
              value={trackProgress}
              onChange={onChangeTrackProgress}
              style={{ background: trackProgressStyling }}
            />
          </div>

          <div className="audio-controls">
            <p style={{ width: "50%", fontSize: "0.8rem" }} onClick={prevTrack}>
              Previous
            </p>
            <p
              style={{
                width: "max-content",
                color: "white",
                fontSize: "1.1rem",
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "Pause" : "Play"}
            </p>
            <p style={{ width: "50%", fontSize: "0.8rem" }} onClick={nextTrack}>
              Next
            </p>
          </div>
        </div>
      )}

      {!slideUp && (
        <>
          <div className="mini-player">
            <div className="mini-player-1">
              <div className="artist-cover" style={{ maxHeight: "40px" }}>
                <img alt="" src={`${baseUrl}/${avatar}`} />
              </div>
              <div className="mini-player-info">
                <p className="mini-player-song-name">{title}</p>
                <p className="mini-player-artist-name">{artist}</p>
              </div>
            </div>
            <div className="mini-player-control">
              {isPlaying ? (
                <p style={{ marginRight: "15px" }}>Pause</p>
              ) : (
                <p style={{ marginRight: "15px" }}>Play</p>
              )}
              <p>Close</p>
            </div>
          </div>
          <div className="navigation-menu">
            <a href="/">
              <p>Home</p>
            </a>
            <a href="/">
              <p>Profile</p>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Footer;
