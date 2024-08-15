import { MapContainer, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './style.css'
import { useEffect, useState } from 'react';
import L from 'leaflet';
import marker from '../../assets/marcador.png';
import { useRestaurantData } from '../../hooks/useRestaurantData';
import { useRestaurantDataMutate } from '../../hooks/useRestaurantDataMutate';
import axios from 'axios';


const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});



function Map() {
  const initialPosition = [-6.88817982014655, -38.55806053465703];
  const [markerPosition, setMarkerPosition] = useState([0,0])
  const [inputValue, setInputValue] = useState('')
  const [marcadorSelecionado, setMarcadorSelecionado] = useState(null);
  const {mutate} = useRestaurantDataMutate()
  const {data} = useRestaurantData()



  function GetAllRestaurantes() {
    console.log(data)
    return data?.map((restaurant) => {
      
      return (
        
      <Marker key={restaurant.id} position={restaurant.localization.coordinates} icon={myIcon}>
        <Popup>{restaurant.name}<br/> <br/> 
        <button onClick={async () => {await deleteRestaurant(restaurant.name)}}>Deletar</button></Popup>
      </Marker>
      )
  })
  }
  
  function salvarRestaurante() {
    const name = inputValue;
    const localization = {
      type:"Point",
      coordinates: markerPosition
    }
    const restaurantData = {
      name,
      localization
    }
    
    mutate(restaurantData)   
  }
  
  async function deleteRestaurant (name){
    const result = await axios.delete(`http://localhost:4000/${name}`)
    console.log(result)
  }

  function updateInput (e){
    setInputValue(e.target.value)
  }
  
  function SetMarker() {
    const map = useMapEvents({
      click(e) {
        const coordinates = e.latlng;
        setMarkerPosition(coordinates)
      },
    })
    return(
      <Marker key={5} position={markerPosition} icon={myIcon}/>
    )
  }

    return (
      <>
      <h1>Food Finder</h1>
        <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={true} className='map-container' >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GetAllRestaurantes/>
          
          <SetMarker/>
        </MapContainer>
        <div className='form'>
          <input value={inputValue} onChange={updateInput} placeholder='Ex: Fast-Lanches' className='input'/>
          <button className='btn' onClick={salvarRestaurante}>Salvar</button>
        
        </div>
        <div className='div'>
          <ul className='lista'>
            {data?.map((item) => {
              return(
                <li key={item.id}>
                  {item.name}
                </li>
              )
            })}
          </ul>
        </div>
      </>
    );
}

export default Map