import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { useMemo, useState, useEffect } from "react";


//does heavy lifting of talking w API
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

//display results and read user input
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css"

import "./Maps.css";

require('dotenv').config();
const libraries = ["places"];
const api_key = process.env.REACT_APP_GOOGLE_MAPS_API;
const Maps = (props) => {
    const center = useMemo( () => ({lat: 44, lng: -80}), []); 
    const markers = props.posts
    const [selected, setSelected] = useState({
        // sets latitude and longitude to first post location but defaults to UCSD
        // if posts are empty
        lat: 32.8801,
        lng: -117.2340
      });
    useEffect(() => {
        setSelected({lat: markers.length > 0 ? markers[props.selected-1].location.lat : 32.8801,
            lng: markers.length > 0 ? markers[props.selected-1].location.lng : -117.2340})
            return () => {
                setSelected({
                    lat: 32.8801,
                    lng: -117.2340
                  });
              };
    }, []);
    return (
    <LoadScript googleMapsApiKey={api_key} libraries={libraries}>
        <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <GoogleMap zoom={15} center={{lat: selected.lat, lng:selected.lng}} mapContainerClassName="map-container">
                {/* {selected && <Marker position={selected}/>} */}
                {markers && markers.map(({ id, location }) => (
        <Marker
          key={id}
          position={location}
        ></Marker>))}

            </GoogleMap>
    </LoadScript>
    )
};


//majority of work done here in the autocomplete function
const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({lat, lng});
        
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput 
            value={value} 
            onChange= {(e) => setValue(e.target.value)} 
            disabled={!ready}
            className="combobox-input" 
            placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && 
                    data.map(({ place_id, description}) => (
                        <ComboboxOption key={place_id} value = {description}/>
                    ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
        
    );
}


export default Maps;