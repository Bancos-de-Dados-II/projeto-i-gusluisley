import { MapContainer, TileLayer, useMapEvents, useMap, useMapEvent} from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './style.css'
import { useState } from 'react';
import { latLng } from 'leaflet';
import L from 'leaflet';
import axios from 'axios';
import marker from '../../assets/marker.icon.jpg';
const baseUrl = 'http://localhost:4000'


const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});



function Map() {
  const initialPosition = [-6.88817982014655, -38.55806053465703];
  const [markerPosition, setMarkerPosition] = useState(initialPosition)
  const [inputValue, setInputValue] = useState('')

  async function getAllRestaurantes() {
    const result = await axios.get(baseUrl)
    console.log(result.data)
  }
  async function salvarRestaurante() {
    const name = inputValue;
    const loc = {
      type:"Point",
      coordinates:[markerPosition]
    }
    const result = await axios.post(baseUrl, {name, loc})
  }

  function updateInput (e){
    setInputValue(e.target.value)
  }
   function SetMarker() {
    const map = useMapEvents({
      click(e) {
        console.log('Disparou')
        const coordinates = e.latlng;
        setMarkerPosition(coordinates)
      },
    })
    return(
      <Marker position={markerPosition} icon={myIcon} >
        <Popup>You are here</Popup>
      </Marker>
    )
  }

    return (
      <>
        <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={true} className='map-container' >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SetMarker/>
        </MapContainer>
        <input value={inputValue} onChange={updateInput} placeholder='Ex: Fast-Lanches'/>
        <button onClick={salvarRestaurante}>Salvar</button>
        <button onClick={getAllRestaurantes}>Get</button>
      </>
    );
}

export default Map