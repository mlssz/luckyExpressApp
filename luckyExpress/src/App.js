import React from 'react';
import {
	Navigator,
	View
} from 'react-native';
import MainPage from './pages/MainPage.js'
import Test from './pages/test.js'

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	configureScene(route) {
		return route.scene || Navigator.SceneConfigs.FloatFromBottom
	}

	render() {
		let defaultName = 'firstPage';
		let defaultPage = MainPage;
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