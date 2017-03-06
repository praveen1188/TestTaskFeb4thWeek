/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
	Dimensions,
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#DB504A',
  },
	item: {
		width: Dimensions.get('window').width - 100,
		height: Dimensions.get('window').height - 80,
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		borderRadius: 30,
	}
});

export default class Anim extends Component {
  constructor() {
		super();

		this.state = {
			opacity: new Animated.Value(0),
		}
	}

	componentDidMount() {
		Animated.timing(this.state.opacity, {toValue: 1, duration: 1000}).start();
	}
  componentDidUpdate() {
    Animated.timing(this.state.opacity, {toValue: 1, duration: 1000}).start();
  }


  render() {
    return (
			<Animated.View
				style={[styles.container, {
					opacity: this.state.opacity,
					transform: [{
						translateY: this.state.opacity.interpolate({
							inputRange: [0, 1],
							outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
						}),
					}],
				}]}
			>
        {this.props.children}
      </Animated.View>
    );
  }
}
