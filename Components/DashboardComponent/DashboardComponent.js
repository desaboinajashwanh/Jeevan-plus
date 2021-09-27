import React, {Component} from 'react';
import {styles} from './DashboardComponent.styles';
import {View, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import {Text, Button} from 'react-native-paper';
import HealthInputComponent from '../HealthInputComponent/HealthInputComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class DashboardComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  getStarted = () => {
    if (this.props.navigation) this.props.navigation.navigate('HealthInput');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../assets/wave.png')}
          style={styles.image}
          resizeMode="cover">
          <View style={styles.headerContainer}>
            <Text style={{color: 'white', fontSize: 15}}>Hello, </Text>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'normal'}}>
              welcome fitness
            </Text>
          </View>

          <View style={styles.bodyContainer}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              We can help to get you diet clean and healthy. Just scan you food
              before eating being healthy is that easy now.
            </Text>
          </View>

          <View
            style={{
              ...styles.bodyContainer,
              justifyContent: 'center',
              marginTop: 40,
            }}>
            <Button
              mode="outlined"
              onPress={() => this.getStarted()}
              style={{
                padding: 5,
                roundness: 10,
                backgroundColor: '#68ca87',
                borderRadius: 25,
                marginTop: 30,
              }}>
              <Text style={{color: 'white'}}>Get Started </Text>
              <Icon name="angle-right" color={'white'} size={17} />
            </Button>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
