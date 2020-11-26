import { covidURL, mainURL, weatherURL, countryURL } from "./settings";
import React, { useState, useEffect } from "react";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function Facade() {

    const GetCovid = () => {
        const [covid, setCovid] = useState([]);
        const [covidWriteValue, setCovidWriteValue] = useState("");

        function handleClick(e) {
            setCovidWriteValue(e)
            console.log(covidWriteValue)
            fetch(covidURL + covidWriteValue, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCovid(data)
                })
        }

        useEffect(() => {

            fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCovid(data.All)
                })
            const interval = setInterval(() => {
                fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                    .then(res => res.json())
                    .then(data => {
                        setCovid(data)
                    })
            }, 200000)

            return () => clearInterval(interval)
        }, []);

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
                        <h4>{weatherWriteValue}</h4>
                        <li>Base: {weather.base}</li>
                        <li>Visibility: {weather.visibility}</li>
                        <li>Clouds: {weather.weather[0].description}</li>
                        <li>Temperature: {weather.main.temp}</li>
                        <li>Temperature feels like: {weather.main.feels_like}</li>
                        <li>Temperature min: {weather.main.temp_min}</li>
                        <li>Temperature max: {weather.main.temp_max}</li>
                    </ul>
                </div>

            );
        }
        return (<div>Waiting for data...</div>);
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
                    setCountry(data)
                })

        }
        useEffect(() => {

            fetch(countryURL + writeValue, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setCountry(data)

                })
        }, []);

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
    }
    return {
        GetCovid,
        GetWeather,
        GetCountry
    }
}
const MyFacade = Facade();
export default MyFacade;