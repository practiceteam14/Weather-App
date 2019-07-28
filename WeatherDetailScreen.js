import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Constants, Font } from 'expo';

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
    Font.loadAsync({
      'custom': require('./assets/fonts/custom.ttf'),
    });
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

        console.log(city);

        fetch(`https://openweathermap.org/data/2.5/weather?q=${city}&appid=b6907d289e10d714a6e88b30761fae22`)
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

        let celsius = this.state.main.temp;
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
        let backimg=require('./assets/Background.png');

        return (
                <ImageBackground
                    style={styles.background}
                    source={backimg}
                >
                    <View style={styles.container}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.text}>오늘 {city}의 날씨는 {weather} 입니다.</Text>
                            <Image
                                style={styles.weatherIcon}
                                source={weatherImg}
                            />
                        </View>
                        <Text style={styles.textBold}>{weather}</Text>
                        <Text style={styles.text}>기온은 {celsius.toFixed(1)}℃ 입니다.</Text>
                    </View>
                </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center',
    },
    text: {
    fontFamily: "custom",
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
    background:{
        height:'100%',
        width:'100%',
        resizeMode:'stretch',
    },
});