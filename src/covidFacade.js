import { covidURL, mainURL, weatherURL, countryURL } from "./settings";
import React, { useState, useEffect } from "react";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function Facade() {

    const GetTopCovid = () => {
        const [covidTop3, setCovidTop3] = useState(undefined);
        let temp = []
        function compareNumbers(a, b) {
            return b.TotalConfirmed - a.TotalConfirmed;
        }

        useEffect(() => {
            fetch(covidURL + "all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    temp = data.Countries;
                    let tempSorted = temp.sort(compareNumbers)
                    if(temp != []){
                    setCovidTop3(tempSorted)
                    }
                })
            const interval = setInterval(() => {
                fetch(covidURL + "all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                    .then(res => res.json())
                    .then(data => {
                        temp = data.Countries;
                        let tempSorted = temp.sort(compareNumbers)
                        if(temp != []){
                        setCovidTop3(tempSorted)
                        }
                    })
            }, 200000)

            return () => clearInterval(interval)
        }, []);

        return (
            <div>
           { !covidTop3 ? (
             <div><h3>Loading...</h3></div>
           ) : (
             
             <div>
               <ul>
                        <li>{covidTop3[0].Country}, {covidTop3[0].TotalConfirmed}</li>
                        <li>{covidTop3[1].Country}, {covidTop3[1].TotalConfirmed}</li>
                        <li>{covidTop3[2].Country}, {covidTop3[2].TotalConfirmed}</li>
                    </ul>
             </div>
           )}
         </div>);

        if (covidTop3.Country !== undefined) {
            return (
                <div>
                    <h4>Top 3</h4>
                    <ul>
                        <li>{covidTop3[0]}</li>
                    </ul>
                </div>
            )
        }
        return (
            <p>Waiting for data...</p>
        )

    }

    const GetCovid = () => {
        const [covid, setCovid] = useState([]);
        const [covidTest, setCovidTest] = useState({});
        const [covidWriteValue, setCovidWriteValue] = useState("");
        let countrySearch = covidWriteValue.charAt(0).toUpperCase() + covidWriteValue.slice(1);

        function handleClick(e) {
            setCovidWriteValue(e)
            fetch(covidURL + countrySearch, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCovid(data.All)
                })
        }

        useEffect(() => {

            fetch("https://www.josefsendavid.dk/eksamensys/api/covid/all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCovidTest(data)

                })

            fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCovid(data.All)
                })

            const interval = setInterval(() => {
                fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                    .then(res => res.json())
                    .then(data => {
                        setCovid(data.All)
                    })
            }, 200000)

            return () => clearInterval(interval)
        }, []);
        if (covid !== undefined) {
            return (
                <div>
                    <input type="text" id="myInput" placeholder="Insert Country" value={covidWriteValue} onChange={(event) => setCovidWriteValue(event.target.value)} />
                    <button onClick={() => handleClick(covidWriteValue)}>Find Country</button>
                    <ul>
                        <h4>{covid.country}</h4>
                        <li>Confirmed: {covid.confirmed}</li>
                        <li>Recovered: {covid.recovered}</li>
                        <li>Deaths: {covid.deaths}</li>
                        <li>Total population: {covid.population}</li>
                        <br />
                        <br />
                        <h4>Countries with highest confirmed:</h4>
                    </ul>

                    <div>

                    </div>
                </div>
            )
        } else {
            return <div>
                <input type="text" id="myInput" placeholder="Insert Country" value={covidWriteValue} onChange={(event) => setCovidWriteValue(event.target.value)} />
                <button onClick={() => handleClick(covidWriteValue)}>Find Country</button>
                <p>Unknown Country... </p>
            </div>

        }
    }

    function GetCovidByCountry(props) {

        let countryFor;
        if (props.country === "rgb(35, 95, 22)") {
            countryFor = "India";
        }
        if(props.country === "rgb(35, 95, 4)"){
            countryFor = "Brazil";
        }

        let [covid, setCovid] = useState([]);

        useEffect(() => {
            if(countryFor){
            fetch(covidURL + countryFor, { headers: { 'Accept': 'application/json' } })
                .then(res => res.json())
                .then(data => {
                    setCovid(data.All)
                })
            }
      
        }, []);
      
        return (
            <div class="fadeIn first">
                <ul>
                    <h4>{covid.country}</h4>
                    <li>Confirmed: {covid.confirmed}</li>
                    <li>Recovered: {covid.recovered}</li>
                    <li>Deaths: {covid.deaths}</li>
                    <li>Total population: {covid.population}</li>
                </ul>
            </div>
        )
      }

    const GetWeather = () => {
        const [weather, setWeather] = useState([]);
        const [weatherWriteValue, setWeatherWriteValue] = useState("");

        function handleClick(e) {
            setWeatherWriteValue(e)
            console.log(weatherWriteValue)
            fetch(weatherURL + weatherWriteValue, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setWeather(data)
                })
        }

        useEffect(() => {

            fetch(weatherURL + "copenhagen", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setWeather(data)
                    console.log(data)
                })
            const interval = setInterval(() => {
                fetch(weatherURL + weatherWriteValue, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                    .then(res => res.json())
                    .then(data => {
                        setWeather(data)
                    })
            }, 200000)

            return () => clearInterval(interval)
        }, []);

        if (weather.main) {
            return (
                <div>
                    <input type="text" id="myInput" placeholder="Insert capital" value={weatherWriteValue} onChange={(event) => setWeatherWriteValue(event.target.value)} />
                    <button onClick={() => handleClick(weatherWriteValue)}>See weather</button>
                    <ul>
                        <h4>Capital: {weatherWriteValue}</h4>
                        <li>Clouds: {weather.weather[0].description}</li>
                        <li>Temperature: {Math.round(weather.main.temp)}</li>
                        <li>Temperature feels like: {Math.round(weather.main.feels_like)}</li>
                        <li>Temperature min: {Math.round(weather.main.temp_min)}</li>
                        <li>Temperature max: {Math.round(weather.main.temp_max)}</li>
                    </ul>
                </div>

            );
        }
        return (<div>
            <input type="text" id="myInput" placeholder="Insert Country" value={weatherWriteValue} onChange={(event) => setWeatherWriteValue(event.target.value)} />
            <button onClick={() => handleClick(weatherWriteValue)}>See weather</button>
            <p>Unknown capital...</p>
        </div>);
    }

    const GetCountry = () => {
        const [country, setCountry] = useState([]);
        const [writeValue, setWriteValue] = useState("");

        function handleClick(e) {
            setWriteValue(e)
            console.log(writeValue)
            fetch(countryURL + writeValue, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setCountry(data)
                })

        }
        useEffect(() => {

            fetch(countryURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCountry(data)

                })
        }, []);
        if (country.name !== undefined) {
            return (
                <div>
                    <input type="text" id="myInput" placeholder="Insert Country" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                    <button onClick={() => handleClick(writeValue)}>Find Country</button>
                    <ul>
                        <h4>{country.name}</h4>
                        <li>Capital: {country.capital}</li>
                        <li>Domain: {country.topLevelDomain}</li>
                        <li>Region: {country.region}</li>
                        <li>Sub Region: {country.subregion}</li>
                        <li>Population: {country.population}</li>
                        <li>Area: {country.area}</li>
                    </ul>
                </div>

            )
        } else {
            return <div>
                <input type="text" id="myInput" placeholder="Insert Country" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                <button onClick={() => handleClick(writeValue)}>Find Country</button>
                <p>Unknown Country... </p>
            </div>

        }

    }
    return {
        GetCovid,
        GetCovidByCountry,
        GetWeather,
        GetCountry,
        GetTopCovid
    }
}
const MyFacade = Facade();
export default MyFacade;