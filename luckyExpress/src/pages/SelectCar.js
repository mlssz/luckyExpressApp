import React from 'react';
import TopBar from '../component/TopBar.js'
import CarItem from '../component/CarItem.js'
import config from '../config.js'

import {
	View,
	ScrollView,
	StyleSheet
} from 'react-native'

export default class SelectCar extends React.Component {
	constructor(props) {
		super(props);
	}

	renderCars() {
		let cars = config.cars;
		return (
			cars.map((car, i) => <CarItem {...car} key={car.name}/>)
		)
	}

	render() {

		return (
			<View style={{flex:1}}>
				<TopBar title='选车'/>
				<ScrollView style={styles.scrollView}>
				{this.renderCars()}
				</ScrollView>
			</View>
		)
	}
}

let styles = StyleSheet.create({
	scrollView: {
		marginVertical: 10,
	}
})