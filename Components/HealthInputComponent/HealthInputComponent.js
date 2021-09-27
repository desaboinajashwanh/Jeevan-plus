import React, {PureComponent, Node} from 'react';
import {styles} from './HealthInputComponent.styles';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Divider,
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions} from 'react-native';

export default class HealthInputComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      textInputStateVariables: {
        age: '55',
        errorInAge: !true,
        weight: '65.77',
        errorInWeight: !true,
      },
      gender: 'Male',
      pregnancyStatus: false,
    };
  }

  componentDidMount() {
    const screenHeight = Dimensions.get('window').height;

    this.setState({screenHeight, gender: 'Male', pregnancyStatus: false});
  }

  changeTextInputStateVariables = (stateVariable, updatedValue) => {
    let textInputStateVariables = {...this.state.textInputStateVariables};

    if (stateVariable === 'age') {
      const errorInAge = /^[0-9]+$/.test(updatedValue);

      textInputStateVariables = {
        ...textInputStateVariables,
        errorInAge: !errorInAge,
      };
    }

    if (stateVariable === 'weight') {
      const errorInWeight = /^\d+(\.\d{1,2})?$/.test(updatedValue);

      textInputStateVariables = {
        ...textInputStateVariables,
        errorInWeight: !errorInWeight,
      };
    }

    textInputStateVariables = {
      ...textInputStateVariables,
      [stateVariable]: updatedValue,
    };

    this.setState({
      textInputStateVariables,
    });
  };

  hasErrorIn = errorToCheckIn => {
    if (errorToCheckIn === 'weight') {
      return this.state.textInputStateVariables.errorInWeight;
    }

    return this.state.textInputStateVariables.errorInAge;
  };

  saveAnswersAndPopCamera = () => {
    if (this.props.navigation)
      this.props.navigation.navigate('CameraComponent');
  };

  setGenderTo = gender => {
    this.setState({gender});
  };

  setPregnancyStatusTo = pregnancyStatus => {
    this.setState({pregnancyStatus});
  };

  render() {
    const {screenHeight, gender, pregnancyStatus} = this.state;

    const minScreenPercentageToCover = 35;

    if (screenHeight)
      return (
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/IconGrid.png')}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}>
            <View style={{flex: 1, backgroundColor: 'transparent'}}>
              <ScrollView
                style={{flex: 1, backgroundColor: 'transparent', evevation: 2}}>
                <View
                  style={{
                    height: (minScreenPercentageToCover * screenHeight) / 100,
                    backgroundColor: 'transparent',
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      ...styles.container,
                      backgroundColor: 'transparent',
                      paddingTop: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Icon name="food-croissant" size={33} color={'#fff'} />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontStyle: 'italic',
                      }}>
                      Healthy me
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.container,
                      backgroundColor: 'transparent',
                      paddingVertical: '15%',
                    }}>
                    <Title
                      style={{fontSize: 30, color: '#fff', fontWeight: '100'}}>
                      Dashboard
                    </Title>
                    <Paragraph style={{color: '#fff', fontWeight: '100'}}>
                      {' '}
                      Help us to know you better.{' '}
                    </Paragraph>
                  </View>
                </View>

                {/* Age question*/}
                <View
                  style={{
                    ...styles.container,
                    ...styles.bodyCard,
                  }}>
                  <View
                    style={{
                      ...styles.container,
                      marginHorizontal: 20,
                      paddingHorizontal: 0,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 25,
                      }}>
                      <Title style={{fontSize: 18}}>Q. What is you age ?</Title>
                      <TextInput
                        mode="outlined"
                        outlineColor="#008cef"
                        placeholder="Enter your age..."
                        keyboardType="numeric"
                        style={{marginTop: 10}}
                        right={<TextInput.Affix text="Years" />}
                        defaultValue={this.state.textInputStateVariables.age}
                        onChangeText={text =>
                          this.changeTextInputStateVariables('age', text)
                        }
                      />
                      <HelperText type="error" visible={this.hasErrorIn('age')}>
                        Enter a valid Age !
                      </HelperText>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 25,
                        marginTop: 15,
                      }}>
                      <Title style={{fontSize: 18}}>
                        Q. What is you weight ?
                      </Title>
                      <TextInput
                        mode="outlined"
                        outlineColor="#008cef"
                        placeholder="Enter your weight..."
                        keyboardType="numeric"
                        style={{marginTop: 10}}
                        right={<TextInput.Affix text="Kg's" />}
                        defaultValue={this.state.textInputStateVariables.weight}
                        onChangeText={text =>
                          this.changeTextInputStateVariables('weight', text)
                        }
                      />
                      <HelperText
                        type="error"
                        visible={this.hasErrorIn('weight')}>
                        Enter a valid Weight !
                      </HelperText>
                    </View>

                    {/* Gender question*/}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 20,
                        marginTop: 15,
                      }}>
                      <Title style={{fontSize: 18}}>
                        Q. What is you gender ?
                      </Title>
                      <View
                        style={{
                          ...styles.container,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginRight: 20,
                            borderColor:
                              gender === 'Male' ? '#008cef' : 'transparent',
                          }}
                          onPress={() => this.setGenderTo('Male')}>
                          <Card.Content style={{flex: 1, alignItems: 'center'}}>
                            <Title>
                              <Icon
                                name="gender-male"
                                size={35}
                                color="#008cef"
                              />
                            </Title>
                            <Paragraph style={{marginTop: 15}}>Male</Paragraph>
                          </Card.Content>
                        </Card>
                        <Card
                          style={{
                            ...styles.selectionCard,
                            marginLeft: 20,
                            borderColor:
                              gender === 'Female' ? '#fc6c85' : 'transparent',
                          }}
                          onPress={() => this.setGenderTo('Female')}>
                          <Card.Content style={{flex: 1, alignItems: 'center'}}>
                            <Title>
                              <Icon
                                name="gender-female"
                                size={35}
                                color="#fc6c85"
                              />
                            </Title>
                            <Paragraph style={{marginTop: 15}}>
                              Female
                            </Paragraph>
                          </Card.Content>
                        </Card>
                      </View>
                    </View>

                    {/* Concieved question*/}

                    {gender === 'Female' && (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          marginBottom: 20,
                          marginTop: 50,
                        }}>
                        <Title style={{fontSize: 18}}>
                          Q. What is your pregnancy status ?
                        </Title>
                        <View
                          style={{
                            ...styles.container,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: 15,
                            alignItems: 'center',
                          }}>
                          <Card
                            style={{
                              ...styles.selectionCard,
                              marginRight: 20,
                              borderColor: pregnancyStatus
                                ? '#68ca87'
                                : 'transparent',
                            }}
                            onPress={() => this.setPregnancyStatusTo(true)}>
                            <Card.Content
                              style={{flex: 1, alignItems: 'center'}}>
                              <Title>
                                <Icon name="plus" size={35} color="#68ca87" />
                              </Title>
                              <Paragraph style={{marginTop: 15}}>
                                Positive
                              </Paragraph>
                            </Card.Content>
                          </Card>
                          <Card
                            style={{
                              ...styles.selectionCard,
                              marginLeft: 20,
                              borderColor: !pregnancyStatus
                                ? '#fa5353'
                                : 'transparent',
                            }}
                            onPress={() => this.setPregnancyStatusTo(false)}>
                            <Card.Content
                              style={{flex: 1, alignItems: 'center'}}>
                              <Title>
                                <Icon name="minus" size={35} color="#fa5353" />
                              </Title>
                              <Paragraph style={{marginTop: 15}}>
                                Negative
                              </Paragraph>
                            </Card.Content>
                          </Card>
                        </View>
                      </View>
                    )}

                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 20,
                        marginTop: 50,
                      }}>
                      <Button
                        mode="contained"
                        style={{
                          padding: 5,
                          elevation: 1,
                          borderRadius: 50,
                          backgroundColor:
                            this.hasErrorIn('weight') || this.hasErrorIn('age')
                              ? '#ececec'
                              : '#008cef',
                        }}
                        disabled={
                          this.hasErrorIn('weight') || this.hasErrorIn('age')
                        }
                        onPress={() => this.saveAnswersAndPopCamera()}>
                        {' '}
                        Open Camera{' '}
                        <Icon name="camera" color="white" size={15} />
                      </Button>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );

    return null;
  }
}

/*
<NavBarComponent />

        <ScrollView style={{height: '100%', padding: 20}}>
          <View style={{flex: 1, width: '100%'}}>
            <IntroBanner />
          </View>

          <View style={{flex: 1, flexDirection: 'column', marginTop: '10%'}}>
            <Text style={styles.questionText}>
              Q. What is you Age and Weight ?
            </Text>
            <View style={styles.row}>
              <View style={styles.column}>
                <TextInput
                  style={{width: '100%'}}
                  label="Enter Age"
                  placeholder="Enter age"
                  mode="outlined"
                  keyboardType="numeric"
                  defaultValue={this.state.textInputStateVariables.age}
                  onChangeText={text =>
                    this.changeTextInputStateVariables('age', text)
                  }
                />
                <HelperText type="error" visible={this.hasErrorIn('age')}>
                  Enter a valid Age !
                </HelperText>
              </View>

              <View style={styles.column}>
                <TextInput
                  style={{...styles.column, width: '100%'}}
                  label="Enter weight"
                  placeholder="Enter weight"
                  mode="outlined"
                  keyboardType="numeric"
                  right={<TextInput.Affix text="kg's" />}
                  defaultValue={this.state.textInputStateVariables.weight}
                  onChangeText={text =>
                    this.changeTextInputStateVariables('weight', text)
                  }
                />
                <HelperText type="error" visible={this.hasErrorIn('weight')}>
                  Enter a valid Weight !
                </HelperText>
              </View>
            </View>
          </View>

          {Object.keys(this.state.booleanInputStateVariables).length > 0
            ? yesNoTypeQuestions
              ? yesNoTypeQuestions.map((question, index) => {
                  return (
                    <View
                      style={{flex: 1, flexDirection: 'column'}}
                      key={index}>
                      <Text
                        style={{
                          ...styles.questionText,
                          marginBottom: 9,
                          marginTop: index === 0 ? 3 : 30,
                        }}>
                        Q. {question.question} ?
                      </Text>
                      <View style={styles.row}>
                        <Card
                          onPress={() =>
                            this.changeBooleanInputStateVariable(question, true)
                          }
                          style={{
                            ...styles.card,
                            backgroundColor:
                              this.state.booleanInputStateVariables[
                                question.stateVariable
                              ] === true
                                ? '#68ca87'
                                : 'rgba(0,0,0,0)',
                          }}>
                          <Card.Content>
                            <Title style={{textAlign: 'center'}}>
                              <Icon
                                name="check"
                                size={35}
                                color={
                                  this.state.booleanInputStateVariables[
                                    question.stateVariable
                                  ] === true
                                    ? '#fff'
                                    : '#68ca87'
                                }
                              />
                            </Title>
                          </Card.Content>
                        </Card>

                        <Card
                          onPress={() =>
                            this.changeBooleanInputStateVariable(
                              question,
                              false,
                            )
                          }
                          style={{
                            ...styles.card,
                            backgroundColor:
                              this.state.booleanInputStateVariables[
                                question.stateVariable
                              ] === false
                                ? '#fa5353'
                                : 'rgba(0,0,0,0)',
                          }}>
                          <Card.Content>
                            <Title style={{textAlign: 'center'}}>
                              <Icon
                                name="times"
                                size={35}
                                color={
                                  this.state.booleanInputStateVariables[
                                    question.stateVariable
                                  ] === false
                                    ? '#fff'
                                    : '#fa5353'
                                }
                              />
                            </Title>
                          </Card.Content>
                        </Card>
                      </View>
                    </View>
                  );
                })
              : null
            : null}

          <View style={{flex: 1, flexDirection: 'column', marginTop: '20%'}}>
            <View style={styles.row}></View>
          </View>
        </ScrollView>

        <Button
          disabled={this.hasErrorIn('weight') || this.hasErrorIn('age')}
          mode="outlined"
          onPress={() => this.saveAnswersAndPopCamera()}
          style={{
            padding: 5,
            roundness: 10,
            backgroundColor: '#68ca87',
            borderRadius: 25,
            marginTop: 30,
            ...styles.fab,
          }}>
          <Text style={{color: 'white', fontSize: 12}}>Take photo </Text>
          <Icon name="arrow-right" color={'white'} size={15} />
        </Button>
*/
