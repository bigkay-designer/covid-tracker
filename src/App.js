import React, { useEffect, useState } from 'react';
import {FormControl, Select, MenuItem} from '@material-ui/core'
import Info from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import {sortData} from './utility'
import {Card, CardContent, Typography} from '@material-ui/core'
import './App.css';
import 'leaflet/dist/leaflet.css'

function App() {
  
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [liveCountryInfo, setLiveCountryInfo] = useState([])
  const [mapZoom, setMapZoom] = useState([3])
  const [mapCenter, setMapCenter] = useState({lat: 51.505, lng: -0.09})
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const countries = data.map((country) => (
          {
            name : country.country,
            value: country.countryInfo.iso2,
            cases:country.cases,
          }
        ))
        const sortedData = sortData(data)
        setLiveCountryInfo(sortedData)
        setCountries(countries)
        setMapCountries(data)
      })
    }
    getCountriesData()
  }, [])

  useEffect(()=>{
    fetch ('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])

const onChangeCountry = async (e)=>{
  const countryCode  = e.target.value

  const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all'
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`

  await fetch (url)
  .then(response => response.json())
  .then(data => {
    
    setMapCenter([data.countryInfo.lat, data.countryInfo.long])
    setMapZoom([6])
    setCountry(countryCode)
    setCountryInfo(data)
  })
}

  return (
    <div className="App">

      <div className="app__mainSec">

      <div className="app__header">

        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onChangeCountry} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

          {countries.map((country)=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
          
          </Select>

        </FormControl>
      </div>

      
      {/* //infoBox */}
      <div className="app__infobox">
        <Info isRed active={casesType === 'cases'} onClick={e => setCasesType('cases')} title={'Covid Cases'} cases={countryInfo.todayCases} total={countryInfo.cases} />
        <Info active={casesType === 'recovered'} onClick={e => setCasesType('recovered')} title={'Recovered'} cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <Info isRed active={casesType === 'deaths'} onClick={e => setCasesType('deaths')} title={'Deaths'} cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>

      {/* Maps */}
      <Map 
        zoom={mapZoom}
        center={mapCenter}
        countries={mapCountries}
        casesType={casesType}
      />
      </div>
      {/* ********************************************* */}
      {/* sidebar char */}
      <div className="app__sideBar">
            <Card>
              <CardContent>

                {/* table */}
                <h2>live cases by country</h2>
                <Table countries={liveCountryInfo} />
                {/* Graph */}
                <h3 className="lineGraph">worldWide graph: {casesType}</h3>

                <LineGraph 
                  casesType={casesType}
                />

              </CardContent>
            </Card>
      </div>
      
    </div>

  );
}

export default App;
