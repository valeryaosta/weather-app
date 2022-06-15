import {useEffect, useState} from "react";

const api = {
    key: `${process.env.REACT_APP_API_KEY}`,
    baseURL: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const [error, setError] = useState(null)

    useEffect((query = 'London') => {
        fetch(`${api.baseURL}weather?q=${query}&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setQuery('')
            })
    }, [])

    const search = (e) => {
        if (e.key === "Enter") {
            fetch(`${api.baseURL}weather?q=${query}&appid=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    if (result.cod === 200) {
                        setError(null)
                        setWeather(result)
                        setQuery('')
                    } else {
                        setError(result.message)
                        setQuery('')
                    }
                })
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }


    return (
        <div className={(typeof weather.main != "undefined")
            ? (((weather.main.temp - 273.15) > 16) ? "app warm" : "app")
            : "app"}
        >
            <main>
                <div className="search-box">
                    <input type="text"
                           className="search-bar"
                           placeholder="Search..."
                           value={query}
                           onChange={e => setQuery(e.target.value)}
                           onKeyPress={search}
                    />
                </div>

                {!error && (typeof weather.main !== "undefined")
                    ? (<div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">{Math.round(weather.main.temp - 273.15)}°С</div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>)
                    : ('')
                }

                {error && <div className="error">{error}...</div>}
            </main>
        </div>
    );
}

export default App;
