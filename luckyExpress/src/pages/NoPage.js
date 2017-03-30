import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	AsyncStorage,
	StyleSheet
} from 'react-native';
import Storage from 'react-native-storage';
import TopBar from '../component/TopBar.js';
import App from '../App.js';
export default class NoPage extends React.Component {

	logOut() {
		storage.remove({
			key: 'loginState'
		});
		alert('logout!');
		this.props.navigator.resetTo({
			component: App
		})
	}

	render() {
		return (
			<View style={{flex:1}}>
				<TopBar title='NoPage' back navigator={this.props.navigator}/>
				<View style={styles.middle}>
					<Text style={styles.topText}>Page:{this.props.name}!</Text>
					<Text style={styles.warnText}>There is no Page!!!</Text>
					<Text style={styles.warnText}>There is no Page!!!</Text>
					<Text style={styles.warnText}>There is no Page!!!</Text>
					<Text style={styles.warnText}>There is no Page!!!</Text>
					<TouchableOpacity
						onPress={this.logOut.bind(this)}>
						<Text>Press this to log out!!!</Text>
					</TouchableOpacity>
				</View>
			</View>

		)
	}
}

let styles = StyleSheet.create({
	middle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	topText: {
		fontSize: 20,
	},
	warnText: {
		color: 'red'
	}
})

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
})