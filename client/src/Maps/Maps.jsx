import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import { useMemo, useState } from "react";


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

import "./Maps.css"

require('dotenv').config({path: '../.env'});

const Maps = () => {
    console.log(process.env.GOOGLE_MAPS_API_KEY)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyBWbuhxOXD56F23tTIgml8j_pYDfkO5NAQ",
        libraries: ["places"],
    });
    console.log(isLoaded)
    if(!isLoaded) return <div>Loading...</div>
    return <Map/>
};



function Map() {
    //will always recenter (recalculate) to this point every new render if dont use "useMemo"
    //useMemo makes it so that only recalculates this value once every dependency(empty array, so no dependenciy so no recalculate) 
    //could also just pull "center" outside of "Map" component
    const center = useMemo( () => ({lat: 44, lng: -80}), []); 
    const [selected, setSelected] = useState({
        lat: 32.8801,
        lng: -117.2340,
      });

    //"Marker" adds pins at lat/lng
    console.log(selected.lat);
    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>

            <GoogleMap zoom={15} center={{lat: selected.lat, lng:selected.lng}} mapContainerClassName="map-container">
                {selected && <Marker position={selected}/>}
            </GoogleMap>
        </>
    );
}

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