import "./App.css";
import axios from "axios";
import { useState } from "react";
import { Buffer } from "buffer";

const empty_image =
  "https://ctl.s6img.com/society6/img/YsPHk-5FwM3a3m0-iUsyhkO9Qlc/w_700/mini-art-prints/4x4/nostand/front/~artwork,fw_1238,fh_1238,iw_1238,ih_1238/s6-original-art-uploads/society6/uploads/misc/231692acc28c485b9cb9a3e919ffdf33/~~/calico-cat1907816-mini-art-prints.jpg";

const loading_image = "https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif";

function App() {
  const [image, setImage] = useState(empty_image);

  const generate = async (prompt) => {
    axios
      .post("http://phantaspace.ddns.net:7863/txt2img", { prompt: prompt }, { responseType: "arraybuffer" })
      .then(function (response) {
        const image_data = Buffer.from(response.data, "binary").toString("base64");
        const image_file = `data:image/png;base64,${image_data}`;
        setImage(image_file);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="" alt="logo" />
        <hr />
        <button
          onClick={() => {
            setImage(loading_image);
            generate("cat");
          }}
        >
          Generate
        </button>
      </header>
    </div>
  );
}

export default App;
