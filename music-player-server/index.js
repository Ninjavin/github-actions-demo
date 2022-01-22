const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { appData } = require("./mock");
const app = express();
const PORT = 9000;

const __AUDIO_TYPE__ = {
  ROCK: "rock",
  JAZZ: "jazz",
  CINEMATIC: "cinematic",
  ACCOUSTIC: "accoustic",
};

function getDirectories(type) {
  return fs.readdirSync(`./music/${type}`);
}

function getSongDetails(type, dir) {
  try {
    const path = `music/${type}/${dir}/media`;
    const audioData = fs.readdirSync(path);
    const audioInfo = fs.readFileSync(`./music/${type}/${dir}/info.json`);
    const parsedData = JSON.parse(audioInfo);
    return {
      avatar: `${path}/${audioData[1]}`,
      audioFile: `${path}/${audioData[0]}`,
      ...parsedData,
    };
  } catch (error) {
    return false;
  }
}

app.use(cors());
// expose the music folder
app.use("/music", express.static("music"));

app.get("/song", (req, res) => {
  const songData = {};

  for (let type in __AUDIO_TYPE__) {
    const directoryItems = getDirectories(__AUDIO_TYPE__[type]);
    directoryItems.forEach((item) => {
      const audioData = getSongDetails(__AUDIO_TYPE__[type], item);
      if (audioData) {
        if (__AUDIO_TYPE__[type] in songData) {
          songData[__AUDIO_TYPE__[type]].push(audioData);
        } else {
          songData[__AUDIO_TYPE__[type]] = [audioData];
        }
      }
    });
  }
  appData["freelicense"] = songData;

  res.status(200).json({ appData });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
