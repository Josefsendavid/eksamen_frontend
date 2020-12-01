import { covidURL, mainURL, weatherURL, countryURL } from "./settings";
import React, { useState, useEffect } from "react";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function Facade() {

    const GetCovidCountries = () => {
        const [covid, setCovid] = useState([]);

        useEffect(() => {

            fetch("http://localhost:8080/startkodeca3/api/covid/all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
                setCovid(data)
                console.log(data)
            })

            const interval = setInterval(() => {
                fetch("http://localhost:8080/startkodeca3/api/covid/all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                    .then(res => res.json())
                    .then(data => {
                        setCovid(data)
                    })
            }, 200000)

            return () => clearInterval(interval)
        }, []);

        if (covid !== undefined) {
            return (
                <div>
                   actually returned
                </div>
            )
        } else {
            return <div>
                <p>Error</p>
            </div>

        }
    }

    const GetCovid = () => {
        const [covid, setCovid] = useState([]);
        const [covidTest, setCovidTest] = useState([]);
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

            fetch("http://localhost:8080/startkodeca3/api/covid/all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
                setCovidTest(data)
                console.log(data)
                console.log("-------------")
                console.log(covidTest)
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
                    </ul>
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
        if(props.country === "rgb(35, 95, 22)"){
            countryFor = "India";
        }
        if(props.country === "rgb(35, 95, 19)"){
            countryFor = "Brazil";
        } 
        
        let [covid, setCovid] = useState([]);
        
        useEffect(() => {
            if(countryFor){
            fetch(covidURL + countryFor, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCovid(data.All)
                    console.log("was inside")
                })
            }

        }, []);

        return (
            <div>
                <ul>
                    <h4>{covid.country}</h4>
                    <li>Confirmed: {covid.confirmed}</li>
                    <li>Recovered: {covid.recovered}</li>
                    <li>Deaths: {covid.deaths}</li>
                    <li>Total population: {covid.population}</li>

                    {countryFor}
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
        if(country.name !== undefined) {
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

        )} else {
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
        GetCovidCountries
    }
}
const MyFacade = Facade();
export default MyFacade;