import { baseUrl } from "../../config";
import "./AudioList.css";

const AudioList = ({ onBackButtonPress, audioList, onTrackSelect }) => {
  return (
    <div className="audio-list">
      <div onClick={onBackButtonPress} className="audio-list-header">
        {/* <img src="back.png" alt="back" /> */}
        <p style={{ color: "grey" }}>Back</p>
      </div>

      <ul>
        {audioList.length ? (
          audioList.map((item, index) => (
            <li
              onClick={() => onTrackSelect(index)}
              key={index}
              className="list-container"
            >
              <div className="list-item">
                <img
                  className="song-img"
                  alt=""
                  src={`${baseUrl}/${item.avatar}`}
                />
                <div className="audio-info">
                  <p className="song-name">{item.title}</p>
                  <p className="artist-name">{item.artist}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            No Audio Available
          </p>
        )}
      </ul>
    </div>
  );
};

export default AudioList;
