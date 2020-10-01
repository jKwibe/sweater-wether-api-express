class ForecastData {
    constructor(forecastResponse) {
        this.current = forecastResponse['current']
        this.hourly = forecastResponse['hourly']
        this.daily = forecastResponse['daily']
    }
    get forecastInfo(){
        return {
            id: null,
            type: 'forecast',
            attributes: this.attributes()
        }
    }

    attributes(){
        return {
            current: this.currentIfo(),
            hourly: this.hourlyInfo(),
            daily: this.dailyInfo()
        }
    }
    currentIfo(){
        return {
            time: this.current['dt'],
            sunrise: this.current['sunrise'],
            sunset: this.current['sunset'],
            temp: this.current['temp'],
            feels_like: this.current['feels_like'],
            humidity: this.current['humidity'],
            uvi: this.current['uvi'],
            visibility: this.current['visibility'],
            weather_description: this.current['weather'][0]['description']
        }
    }
    hourlyInfo(){
       return this.hourly.map( obj => {
           return {
                time: obj['dt'],
                temp: obj['temp']
            }
        });
    }
    dailyInfo(){
       return this.daily.map(obj => {
            return {
                time: obj['dt'],
                temp_high: obj['temp']['max'],
                temp_low: obj['temp']['min'],
                rain: obj['rain'],
                description: obj['weather'][0]['main']
            }
        })
    }
}

module.exports = ForecastData