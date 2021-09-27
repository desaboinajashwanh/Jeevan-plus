import React, {Component} from 'react';
import {styles} from './HealthPredection.styles';
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {Card, Text, Button, FAB, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavbarBarComponent from '../NavbarBarComponent/NavbarBarComponent';
import FoodContentStatusComponent from '../FoodContentStatusComponent/FoodContentStatusComponent';
import {foodContentType} from '../../Constants';

export default class HealthPredection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowPercentHeight: 1,
    };
  }

  componentDidMount() {
    this.setState({
      windowPercentHeight: Math.floor(
        (55 / 100) * Dimensions.get('window')['height'],
      ),
    });
  }

  goToPrevoiusScreen = () => {
    if (this.props.navigation) this.props.navigation.goBack();
  };

  render() {
    const {windowPercentHeight} = this.state;
    return (
      <SafeAreaView>
        <ScrollView
          style={{
            ...styles.container,
            backgroundColor: '#fff',
          }}>
          <View style={styles.imageWrapper}>
            <Image
              style={{
                width: '100%',
                height: windowPercentHeight,
              }}
              resizeMode="cover"
              source={require('../../assets/sample_food.jpg')}
            />
            <View style={{...styles.imgOverlay, height: windowPercentHeight}}>
              <FAB
                style={styles.backButton}
                small
                icon="arrow-left"
                color="white"
                onPress={() => this.goToPrevoiusScreen()}
              />

              <Card style={styles.foodNameCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                  }}>
                  {' '}
                  Italian burger{' '}
                </Text>
              </Card>

              <Card style={styles.foodHealthyStatusCard}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                  }}>
                  {' '}
                  Is not healthy{' '}
                </Text>
              </Card>

              <FAB
                style={styles.foodHealthyStatusFab}
                small
                icon="check"
                color={'#2b2d42'}
              />
            </View>
          </View>

          <View style={{...styles.container, padding: 10}}>
            <Title
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontSize: 25,
                paddingHorizontal: 10,
              }}>
              Nutritional value{' '}
            </Title>
            <Paragraph style={{paddingHorizontal: 10}}>
              Below values are calculated by comparing the quantity of nutrients
              in the above food and expected daily in take of that nutrient.
            </Paragraph>

            <View>
              <FoodContentStatusComponent
                foodContentType={foodContentType.PROTIEN}
                foodContentQuantity={22}
              />
              <FoodContentStatusComponent
                foodContentType={foodContentType.CARBS}
                foodContentQuantity={40}
              />
              <FoodContentStatusComponent
                foodContentType={foodContentType.FATS}
                foodContentQuantity={55}
              />
              <FoodContentStatusComponent
                foodContentType={foodContentType.SUGAR}
                foodContentQuantity={77}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
