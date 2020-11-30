import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './final.css';
import './App.css';
import { WorldMap } from "react-svg-worldmap"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
  useHistory

} from "react-router-dom";
import covidFacade from "./covidFacade";
import { covidURL, countryURL, weatherURL } from "./settings";


const Content = (props) => {
  return (
    <div>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/covid">
            <Covid covidFacade={props.covidFacade} />
          </Route>
          <Route path="/country">
            <Country />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

const Header = ({ loggedIn }) => {
  return (
    <>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">Home</NavLink>

        </li>
        {loggedIn && (
          <React.Fragment>
            <li>
              <NavLink activeClassName="active" to="/covid">Covid</NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/weather">Weather</NavLink>

            </li>
            <li>
              <NavLink activeClassName="active" to="/country">Country</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>

      <hr />
    </>
  );
}

function Home() {
  const [currentCountry, setCurrentCountry] = useState("")

  useEffect(() => {
  });

  function stringTry(){
    let str = '{\"Afghanistan\": {\"All\": {\"confirmed\": 46215, \"recovered\": 36731, \"deaths\": 1763, \"country\": \"Afghanistan\", \"population\": 35530081, \"sq_km_area\": '
    let loc = str.search("Afghanistan")
  }

  const data =
    [
      { country: "cn", value: 86490 }, // china
      { country: "in", value: 9266705 }, // india
      { country: "us", value: 13139882 },  // united states
      { country: "id", value: 2649358 },  // indonesia
      { country: "pk", value: 2107978 },  // pakistan
      { country: "br", value: 6166898 },  // brazil
      { country: "ng", value: 2082262 },  // nigeria
      { country: "bd", value: 161061 },  // bangladesh
      { country: "ru", value: 2187990 },  // russia
      { country: "mx", value: 1170487 },  // mexico
      { country: "dk", value: 3115 },   // denmark
      { country: "gl", value: 17 },   // greenland
      { country: "de", value: 996000 },  // germany
      { country: "ca", value: 306000 },  // canada
    ]

    const stylingFunction = (context) => {
      const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))

      return {
        fill: context.country === "US" ? "#235f17" : context.color 
        && context.country === "IN" ? "#235f16" : context.color
        && context.country === "CN" ? "#235f15" : context.color
        && context.country === "ID" ? "#235f14" : context.color
        && context.country === "PK" ? "#235f13" : context.color
        && context.country === "NG" ? "#235f12" : context.color
        && context.country === "RU" ? "#235f11" : context.color
        && context.country === "DK" ? "#235f09" : context.color
        && context.country === "CA" ? "#235f08" : context.color
        && context.country === "MX" ? "#235f07" : context.color
        && context.country === "GL" ? "#235f06" : context.color
        && context.country === "DE" ? "#235f05" : context.color
        && context.country === "BR" ? "#235f04" : context.color,
        
        fillOpacity: opacityLevel, 
        stroke: "green", 
        strokeWidth: 1, 
        strokeOpacity: 0.5, 
        cursor: "pointer" 
           }
    }
    
  return (
    <div>
      <div className="Main">
        <table>
          <tbody>
            <tr>
              <td>
                <div
                  className="row"
                  onClick={(e) => {
                    setCurrentCountry("");
                    setCurrentCountry(e.target.style.fill);
                    console.log(currentCountry)
                  }}
                >
                  <WorldMap
                    color={"black"}
                    tooltipBgColor={"#D3D3D3"}
                    valueSuffix="cases"
                    size="xl"
                    data={data}
                    styleFunction={stylingFunction}
                  />

                  {!currentCountry ? (
                    <div></div>
                  ) : (
                    <div>
                      <GetCovidByCountry country = {currentCountry}/>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GetCovidByCountry(props) {
       
  let countryFor;
  if(props.country === "rgb(35, 95, 22)"){
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
      <div>
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

function Covid() {
  let covidData = covidFacade.GetCovid();
  return (
    <div>
      {covidData}
    </div>
  )
}

function Weather() {
  let weatherData = covidFacade.GetWeather();
  return (
    <div>
      {weatherData}
    </div>
  )
}

function Country() {
  let countryData = covidFacade.GetCountry();
  return (
    <div> 
      {countryData}
    </div>
  )
}


const NoMatch = () => {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for location  <code>{location.pathname}</code>
      </h3>
    </div>
  )
}





function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <div id="formContent">
        <h2>Login</h2>

        <form class="fadeIn second" onChange={onChange} >
          <input placeholder="User Name" class="form-control" id="username" />
          <br></br>
          <div class="fadeIn third"><input placeholder="Password" class="form-control" id="password" /></div>
          <br></br>

          <br></br>

          <div id="formFooter">
            <a class="underlineHover" href="#"><div class="fadeIn fourth"><button class="btn btn-default" onClick={performLogin}>Login</button></div></a>
          </div>
        </form>

      </div></div>
  )

}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    facade.fetchData().then(data => setDataFromServer(data.msg))
      .catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message)
          console.log("error:" + err)
        })
      })
  }, [])

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      {errorMessage}
    </div>
  )

}

function App(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  let history = useHistory();


  const logout = () => {
    facade.logout()
    setLoggedIn(false)
    history.push("/");
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => {
        setLoggedIn(true)
        setErrorMessage("")
      }).catch((error) => {
        error.fullError.then((err) => {
          setErrorMessage(err.message)
          console.log("error: " + err)

        })
      })


      ;
  }

  return (

    <div class="header">

      <Router>
        <Header loggedIn={loggedIn} />
        <Content covidFacade={props.covidFacade} />


        <div class="wrapper">
          {!loggedIn ?
            (<div><LogIn login={login} />
              {errorMessage}</div>) :
            (<div>
              <LoggedIn />
              <button class="btn btn-default" onClick={logout}>Logout</button>


            </div>)}

        </div>
      </Router>

    </div>

  )


}

export default App;
