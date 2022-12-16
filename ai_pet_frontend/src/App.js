import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import features from "./features.json";
import Home from "./home/Home";

const empty_image =
  "https://ctl.s6img.com/society6/img/YsPHk-5FwM3a3m0-iUsyhkO9Qlc/w_700/mini-art-prints/4x4/nostand/front/~artwork,fw_1238,fh_1238,iw_1238,ih_1238/s6-original-art-uploads/society6/uploads/misc/231692acc28c485b9cb9a3e919ffdf33/~~/calico-cat1907816-mini-art-prints.jpg";

const loading_image = "https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif";

function App() {
  const [pet, setPet] = useState("");
  const [image, setImage] = useState(empty_image);
  const [prompt, setPrompt] = useState(pet);

  const generate = async (prompt) => {
    axios
      .post("http://phantaspace.ddns.net:7863/txt2img", { prompt: prompt }, { responseType: "arraybuffer" })
      .then(function (response) {
        const image_data = Buffer.from(response.data, "binary").toString("base64");
        const image_file = `data:image/png;base64,${image_data}`;
        setImage(image_file);
      });
  };

  useEffect(() => {
    console.log(features);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={image} className="" alt="logo" style={{ width: "512px", height: "512px" }} />
        <hr />
        prompts: {prompt}
        <hr />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {features.species.map((specie) => {
            return (
              <button
                onClick={() => {
                  setPet("disney " + specie);
                  setPrompt(specie);
                }}
              >
                {specie}
              </button>
            );
          })}
        </div>
        <hr />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.keys(features.maps).map((location) => {
            const activities = features.maps[location];
            const activity = activities[Math.floor(Math.random() * activities.length)];
            return (
              <button
                onClick={() => {
                  setPrompt(pet + " " + activity + " at " + location);
                }}
              >
                {location}
              </button>
            );
          })}
        </div>
        <hr />
        <button
          onClick={() => {
            setImage(loading_image);
            generate(prompt);
          }}
        >
          Generate
        </button> */}
        <Home />
      </header>
    </div>
  );
}

export default App;
