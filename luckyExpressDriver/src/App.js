import React from 'react';
import {
	Navigator,
	View,
	BackAndroid,
	AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';
import MainPage from './pages/Index.js'
import Login from './pages/Login.js'
import Test from './pages/Index.js'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			token: null,
			defaultPage: Login
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
					token,
					user: res,
					defaultPage: MainPage
				});
			}
		}).catch((err) => console.warn(err));
		BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
	}

	handleBack = () => {
		const navigator = this.refs.navigator
		if (navigator && navigator.getCurrentRoutes().length > 1) {
			navigator.pop()
			return true
		}
		return false;
	}

	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
	}

	render() {
		let defaultName = 'firstPage';
		// defaultPage = Test;
		return (
			<View style={{flex:1}}>
				<Navigator
					ref='navigator'
					initialRoute = {{name: defaultName,component:false}}
					configureScene = {this.configureScene}
					renderScene = {(route, navigator)=>{
	                	let Component = route.name==='firstPage'?this.state.defaultPage:route.component;
	                	return <Component {...route.params} navigator={navigator} user={this.state.user}/>
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