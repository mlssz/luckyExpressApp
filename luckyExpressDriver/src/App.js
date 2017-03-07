import React from 'react';
import {
	Navigator,
	View,
	AsyncStorage
} from 'react-native';
import MainPage from './pages/Login.js'
import Login from './pages/Login.js'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	configureScene(route) {
		return route.scene || Navigator.SceneConfigs.FloatFromBottom
	}

	render() {
		let token = AsyncStorage.getItem('token', (err) => console.log(err));
		let defaultName = 'firstPage';
		let defaultPage = token ? MainPage : Login;
		// let defaultPage = Test;
		return (
			<View style={{flex:1}}>
				<Navigator 
					initialRoute = {{name: defaultName,component: defaultPage}}
					configureScene = {this.configureScene}
					renderScene = {(route, navigator)=>{
	                	let Component = route.component;
	                	return <Component {...route.params} navigator={navigator}/>
	              	}}
	            />
			</View>

		)
	}
}