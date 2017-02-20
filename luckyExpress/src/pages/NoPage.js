import React from 'react';
import {
	Text,
	View,
	AsyncStorage
} from 'react-native';
import TopBar from '../component/TopBar.js'
export default class NoPage extends React.Component {

	logOut() {
		AsyncStorage.multiRemove(['phone', 'token'], () => console.log('log out'));
	}

	render() {
		return (
			<View>
				<TopBar title='NoPage' back navigator={this.props.navigator}/>
				<Text>Page:{this.props.name}!</Text>
				<Text>There is no Page!!!</Text>
				<Text onPress={this.logOut.bind(this)}>Press this log out!!!</Text>
			</View>

		)
	}
}