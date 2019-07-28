import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { SearchBar } from 'react-native-elements';

export default class CityList extends React.Component {
  static navigationOptions = {
    title: 'Cities',
  };

  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
      .then(response => response.json())
      .then(cities => {
        console.log('cities =', cities.length);
        this.setState({
          cities: cities
        });
        this.arrayholder = cities;
      });
  }



  onPressCity(item) {
    this.props.navigation.navigate(
      'Detail',
      {
        city: item
      }
    );
  }

  renderItem(city) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
        <Text style={styles.text}>{city}</Text>
      </TouchableOpacity>
    );
  }

  updateSearch = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    console.log('input:' + text);

    this.setState({
      cities: newData,
    });

  };

  renderHeader = () => {
    return (
        <SearchBar
            round
            lightTheme
            placeholder="도시 이름을 입력하세요..."
            onChangeText={text => this.updateSearch(text)}
            autoCorrect={false}
            value={this.state.value}
        />
    );
  };

  render() {

    return (
      <FlatList
          style={styles.container}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item}
          data={this.state.cities}
          ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    height: 50,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#dddddd',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  }
});