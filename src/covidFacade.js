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
        const [covidCountry, setCountry] = useState("")
        const [covidConfirmed, setConfirmed] = useState("")
        const [covidRecovered, setRecovered] = useState("")
        const [covidPopulation, setPopulation] = useState("")
    
        useEffect(() => {
          
         fetch(covidURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
            .then(res => res.json())
            .then(data => {
               setCountry(data.All.country)
               setConfirmed(data.All.confirmed)
               setRecovered(data.All.recovered)
               setPopulation(data.All.population)

              
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
                
               <ul>{covidCountry}</ul>
               <ul>Confirmed: {covidConfirmed}</ul>
               <ul>Recovered: {covidRecovered}</ul>
               <ul>Total population: {covidPopulation}</ul>
            </div>
        )
    }

    const GetWeather = () => {
        const [weather, setWeather] = useState([]);

        useEffect(() => {
          
            fetch(weatherURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
               .then(res => res.json())
               .then(data => {
                setWeather(data)
                  
               })
               const interval = setInterval(() => {
                 fetch(weatherURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                 .then(res => res.json())
                 .then(data => {
                    setWeather(data)
               })
               }, 200000)
           
               return () => clearInterval(interval)
             }, []);


        return (
          <div>
            <ul>Visibility: {weather.visibility}</ul>
          </div>
        );
    }

    const GetCountry = () => {
        const [country, setCountry] = useState([]);

        useEffect(() => {
          
            fetch(countryURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
               .then(res => res.json())
               .then(data => {
                setCountry(data)
                  
               })
               const interval = setInterval(() => {
                 fetch(countryURL + "Denmark", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                 .then(res => res.json())
                 .then(data => {
                    setCountry(data)
               })
               }, 200000)
           
               return () => clearInterval(interval)
             }, []);

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