import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    console.log(city);

    fetch(`http://192.168.43.53:8081/weather-crawler/current-weathers/by-city-name/${city}`)
    .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weather = this.state.weather[0].main;

    let weatherImg;

    if(weather == 'Clear') {
        weatherImg = require(`./assets/weather-img/Clear.png`)
    }
    else if(weather == 'Clouds') {
        weatherImg = require('./assets/weather-img/Clouds.png')
    }
    else if(weather == 'Rain') {
        weatherImg = require('./assets/weather-img/Rain.png')
    }
    else if(weather == 'Fog' || weather == 'Haze') {
        weatherImg = require('./assets/weather-img/Fog.png')
    }
    else if(weather == 'Snow') {
        weatherImg = require('./assets/weather-img/Snow.png')
    }
    else if(weather == 'Drizzle' || weather == 'Mist') {
        weatherImg = require('./assets/weather-img/Drizzle.png')
    }
    else if(weather == 'Sand' || weather == 'Dust') {
        weatherImg = require('./assets/weather-img/Dust.png')
    }
    else if(weather == 'Thunderstorm') {
        weatherImg = require('./assets/weather-img/Thunderstorm.png')
    }
    else {
        weatherImg = require('./assets/weather-img/Clear.png')
    }
    
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.weatherIcon}
            source={weatherImg}
          />
        </View>
        <Text style={styles.textBold}>{weather}</Text>
        <Text style={styles.text}>{celsius.toFixed(1)}℃</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
  },
  text: {
      fontSize: 25,
      textAlign: 'center',
  },
  textBold: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  weatherIcon: {
      height: 200,
      width: 200,
      margin: 20,
      resizeMode:'center',
  },
});