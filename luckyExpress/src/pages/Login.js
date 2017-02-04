import React from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Image,
	AsyncStorage
} from 'react-native';
import TopBar from '../component/TopBar.js';
import LoginForm from '../component/LoginForm.js'
export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let {
			height,
			width
		} = Dimensions.get('window');
		return (
			<Image source={require('../img/loginbg.png')} style={{width:width,height:height}}>
				<TopBar navigator={this.props.navigator} title='登录' back/>
				<View style={styles.content}>
					<LoginForm navigator={this.props.navigator}/>
				</View>
			</Image>
		)
	}
}

let styles = StyleSheet.create({
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
})