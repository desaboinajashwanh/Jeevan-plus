import {styles} from './FoodContentStatusComponent.styles';
import React, {Component} from 'react';
import {View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Card, Text, Title, Paragraph} from 'react-native-paper';
import {foodContentType} from '../../Constants';

export default class FoodContentStatusComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorSchemes: Object.freeze({
        [foodContentType.PROTIEN]: (opacity = 1) =>
          `rgba(247, 40, 40, ${opacity})`,
        [foodContentType.FATS]: (opacity = 1) =>
          `rgba(250, 193, 25,  ${opacity})`,
        [foodContentType.CARBS]: (opacity = 1) =>
          `rgba(72, 11, 224,  ${opacity})`,
        [foodContentType.SUGAR]: (opacity = 1) =>
          `rgba(7, 203, 253,  ${opacity})`,
      }),
      chartConfig: {
        backgroundGradientFrom: 'rgba(0,0,0,0)',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'rgba(0,0,0,0)',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(20, 184, 72, ${opacity})`,
      },
    };
  }

  componentDidMount() {
    if (this.props.foodContentQuantity) {
      this.setState({
        foodContentQuantity:
          this.props.foodContentQuantity > 0
            ? this.props.foodContentQuantity / 100
            : 0,
      });
      this.setChartColor();
    }
  }

  hasFoodContent = objectToSearch => {
    return objectToSearch['foodContentType'] ? true : false;
  };

  setChartColor = () => {
    if (this.hasFoodContent(this.props)) {
      let chartConfig = this.state.chartConfig;

      chartConfig = {
        ...chartConfig,
        color: this.state.colorSchemes[this.props.foodContentType],
      };

      this.setState({chartConfig});
    }
  };

  getTitle = () => {
    if (this.hasFoodContent(this.props)) {
      const title = foodContentType[this.props.foodContentType];
      return `${title.substr(0, 1)}${title.substr(1).toLowerCase()}`;
    }
  };
  render() {
    const data = {
      data: [0.4],
    };

    return (
      <>
        {this.state.foodContentQuantity ? (
          <View style={styles.container}>
            <Card
              style={{
                ...styles.statusCard,
                borderColor:
                  this.state.colorSchemes[this.props.foodContentType](),
              }}>
              <Card.Content>
                <View style={styles.row}>
                  <ProgressChart
                    data={[this.state.foodContentQuantity]}
                    width={100}
                    height={90}
                    radius={32}
                    strokeWidth={12}
                    chartConfig={this.state.chartConfig}
                    hideLegend={true}
                  />

                  <View
                    style={{
                      ...styles.container,
                      backgroundColor: 'rgba(0,0,0,0)',
                      marginTop: 0,
                      marginRight: 10,
                      textAlign: 'right',
                    }}>
                    <Title style={{textAlign: 'right', fontSize: 20}}>
                      {' '}
                      {this.getTitle()}{' '}
                    </Title>
                    <Paragraph style={{textAlign: 'right', marginTop: 1}}>
                      This item as{' '}
                      {Math.round(this.state.foodContentQuantity * 100)}%{' '}
                      {this.getTitle()} is good for your days diet
                    </Paragraph>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        ) : null}
      </>
    );
  }
}
