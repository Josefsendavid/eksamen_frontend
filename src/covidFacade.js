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

        useEffect(() => {
          
         fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
               setCovid(data)
                console.log(covid.All.confirmed)
            })
            const interval = setInterval(() => {
              fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
              .then(res => res.json())
              .then(data => {
                 setCovid(data)
            })
            }, 20000)
        
            return () => clearInterval(interval)
          }, []);

        return (
            <div>
                <ul>{covid.All.country}</ul>
                <ul>{covid.All.confirmed}</ul>
                <ul>{covid.All.recovered}</ul>
                <ul>{covid.All.deaths}</ul>
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
           
            <ul>Visibility: {weather.visibility}</ul>
          </div>
        );
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
                <ul>  {country.name}</ul>
                <ul>  {country.capital}</ul>
                <ul>  {country.region}</ul>
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