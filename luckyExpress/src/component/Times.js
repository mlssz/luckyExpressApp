import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal
} from 'react-native';
import {
	Icon
} from 'react-native-elements';
import TimePicker from './TimePicker/TimePicker.js'

export default class Times extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			useTime: '现在',
			visible: false,
		}
		this.closeTime = this.closeTime.bind(this);
	}

	openTime() {
		this.setState({
			visible: true,
		})
	}

	closeTime() {
		this.setState({
			visible: false,
		})
	}

	render() {
		return (
			<TouchableOpacity style={styles.times} activeOpacity={0.3} onPress={this.openTime.bind(this)}>
				<View style={styles.leftView}>
					<Icon name='schedule'/>
					<Text style={styles.normalText}>用车时间</Text>
					<Text style={[styles.normalText,{color:'red'}]}>{this.state.useTime}</Text>
				</View>
				<View style={styles.rightView}>
					<Text style={[styles.normalText,{color:'red'}]}>点击修改</Text>
					<Icon name='navigate-next'/>
				</View>
				<TimePicker 
					visible={this.state.visible}
					animationType='slide'
					closeTime={this.closeTime}/>
			</TouchableOpacity>
		)
	}

}

let styles = StyleSheet.create({
	times: {
		flexDirection: 'row',
		marginBottom: 10,
		backgroundColor: '#FFFFFF',
		padding: 10,
		alignItems: 'center',
	},
	normalText: {
		marginLeft: 10,
	},
	leftView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',

	},
	rightView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	modal: {
		backgroundColor: 'yellow'
	}
})