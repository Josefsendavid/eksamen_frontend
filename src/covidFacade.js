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
        fetch(covidURL, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
                setCovid(data)
            })

        return (
            <div>
                <ul>
                    <li>{covid}</li>
                </ul>
            </div>

        )
    }

    const GetWeather = () => {
        const [weather, setWeather] = useState([]);
        fetch(weatherURL, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
                setWeather(data)
            })

        return (
            <div>
                <ul>
                    <li>{weather.timezone}</li>
                </ul>
            </div>

        )
    }

    const GetCountry = () => {
        const [country, setCountry] = useState([]);
        fetch(countryURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
                setCountry(data)
            })

        return (
            <div>
                <ul>
                    {country.map(data => {
                        <li>{data.capital}</li>
                    })}
                    <li>{country.capital}</li>
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