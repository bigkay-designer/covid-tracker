import React from 'react'
import {Circle, Popup} from 'react-leaflet'
import './Map.css'
import numeral from 'numeral'
// import numeral from 'numeral'

const casesTypeColors = {
    cases: {
        hex: '#cc1032',
        multiplier: 800,
    },
    recovered: {
        hex: '#7dd71d',
        multiplier: 1200,
    },
    deaths: {
        hex: '#fb4442',
        multiplier: 2000,
    },
};

export const sortData = (data) =>{
    const sortedData = [...data]
    
    sortedData.sort((a, b) =>{
        if(a.cases > b.cases){
            return -1
        }else{
            return 1
        }
    })
    return sortedData
}

// ******map data***************

export const showData = (data, casesType='cases')=>(
    data.map((country) =>(
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.5}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
                <div className="popup__infoContainer">
                <img src={country.countryInfo.flag} alt=""/>
                <p>
                   <span>Cases:</span><br/> 
                    <h3>{country.cases}</h3>
                </p>
                <p>
                   <span>Recovered:</span><br/> 
                    <h3>{country.cases}</h3>
                </p>
                <p>
                   <span>Deaths:</span><br/> 
                    <h3>{country.deaths}</h3>
                </p>
                </div>
            </Popup>

        </Circle>
    ))
)
