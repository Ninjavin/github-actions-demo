import { useEffect, useState } from "react";
import AudioList from "./components/AudioList/AudioList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Tabs from "./components/Tabs/Tabs";
import { baseUrl } from "./config";
import "./App.css";

function App() {
  const [list, setList] = useState(false);
  const [appData, setAppData] = useState({});
  const [audioList, setAudioList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(-1);

  const onBackButtonPress = () => {
    setList(false);
  };

  const onItemSelect = (type) => {
    if (type in appData["freelicense"]) {
      const audioList = appData["freelicense"][type];
      setAudioList(audioList);
    } else {
      //to remove old items from array
      setAudioList([]);
    }

    setList(true);
  };

  const onTrackSelect = (index) => {
    setTrackIndex(index);
  };

  useEffect(() => {
    fetch(`${baseUrl}/song`)
      .then((res) => res.json())
      .then((jsonResp) => {
        console.log({ jsonResp });
        setAppData(jsonResp.appData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(trackIndex);

  return (
    <div className="App">
      <Header />
      <p className="main-text">Find the best music for your code</p>
      <SearchBar />
      <Tabs onItemSelect={onItemSelect} tabData={appData["homeScreen"]} />
      {list && (
        <AudioList
          audioList={audioList}
          onTrackSelect={onTrackSelect}
          onBackButtonPress={onBackButtonPress}
        />
      )}
      <Footer trackIndex={trackIndex} audioList={audioList} />
    </div>
  );
}

export default App;
