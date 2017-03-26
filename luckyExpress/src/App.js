import React from 'react';
import {
	Navigator,
	BackAndroid,
	View
} from 'react-native';
import MainPage from './pages/MainPage.js'
import Test from './pages/ChooseDriver.js'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	configureScene(route) {
		return route.scene || Navigator.SceneConfigs.FloatFromBottom
	}

	componentWillMount() {
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
		let defaultPage = MainPage;
		// defaultPage = Test;
		return (
			<View style={{flex:1}}>
				<Navigator 
					ref='navigator'
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