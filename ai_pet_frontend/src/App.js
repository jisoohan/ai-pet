import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import features from "./features.json";
import petSpeciesJson from "./petSpecies.json";
import Home from "./home/Home";

const empty_image =
  "https://ctl.s6img.com/society6/img/YsPHk-5FwM3a3m0-iUsyhkO9Qlc/w_700/mini-art-prints/4x4/nostand/front/~artwork,fw_1238,fh_1238,iw_1238,ih_1238/s6-original-art-uploads/society6/uploads/misc/231692acc28c485b9cb9a3e919ffdf33/~~/calico-cat1907816-mini-art-prints.jpg";

const loading_image = "https://i.pinimg.com/originals/71/3a/32/713a3272124cc57ba9e9fb7f59e9ab3b.gif";

function App() {
  const [generated, setGenerated] = useState(false);
  const [pet, setPet] = useState({
    name: '',
    species: petSpeciesJson.species[0],
    traits: []
  });

  const [image, setImage] = useState(empty_image);
  const [prompt, setPrompt] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFormChange = (event) => {
    setPet({ ...pet, [event.target.name]: event.target.value});
  };

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    setGenerated(true);
    setImage(loading_image);
    generate(pet.species);
    handleClose();
  };

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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={image} className="" alt="logo" style={{ width: "512px", height: "512px" }} />
        <hr />
        <Button variant="primary" onClick={handleShow}>
          Generate pet!!!
        </Button>
        {generated &&
            <span>
              Pet Name: {pet.name}
              <br/>
              Pet Species: {pet.species}
              <br/>
              Pet Traits: {pet.traits.toString()}
            </span>
        }
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Generate a new pet!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPetName">
                  <Form.Label>Pet Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={pet.name}
                    placeholder="Enter pet name"
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group controlId="formPetSpecies">
                  <Form.Label>Pet Species</Form.Label>
                  <select className="form-control" value={pet.species} name="species" onChange={handleFormChange}>
                    {petSpeciesJson.species.map((species, i) => {
                      return <option value={species}>{species}</option>;
                    })}
                  </select>
                </Form.Group>
                <hr />
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <hr />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {generated &&
            Object.keys(features.maps).map((location) => {
              const activities = features.maps[location];
              const activity = activities[Math.floor(Math.random() * activities.length)];
              return (
                <button
                  onClick={() => {
                  setPrompt(pet.traits.join(" ") + " " + pet.species + " " + activity + " at " + location);
                  setImage(loading_image);
                  generate(prompt);
                  const newTraits = pet.traits;
                  newTraits.push(activity);
                  setPet({ ...pet, traits: newTraits});
                  }}
                >
                  {location}
                </button>
              );
            })}
        </div>
      </header>
    </div>
  );
}

export default App;
