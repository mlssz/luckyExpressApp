import React from 'react';
import {
	Navigator,
	View,
	AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
import MainPage from './pages/Login.js'
import Login from './pages/Login.js'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
		}
	}

	configureScene(route) {
		return route.scene || Navigator.SceneConfigs.FloatFromBottom
	}

	componentWillMount() {
		storage.load({
			key: 'loginState',
		}).then((res) => {
			if (res !== null) {
				let token = res.token;
				this.setState({
					token
				});
			}
		}).catch((err) => console.warn(err));
	}

	render() {
		let defaultName = 'firstPage';
		let defaultPage = this.state.token ? MainPage : Login;
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

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
})