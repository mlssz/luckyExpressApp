import React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import FormElement from '../component/FormElement.js'
import Register from './Register.js'

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			psw: '',
		}
		this.register = this.register.bind(this)
	}

	register() {
		let navigator = this.props.navigator;
		if (navigator)
			navigator.push({
				component: Register,
			})
	}
	render() {
		return (
			<Image source={require('../img/bg_1.png')} style={styles.backgroundImg}>
				<View style={styles.container}>
					<FormElement 
						formInput='手机号' 
						placeholder='11位数字'
						maxLength={11}
						value={this.state.phone}
						onChangeText={(phone)=>this.setState({phone})}/>
					<FormElement 
						formInput='密码' 
						placeholder='登录密码'
						value={this.state.psw}
						onChangeText={(psw)=>this.setState({psw})}
						secureTextEntry/>
					<TouchableOpacity 
						style={styles.button}
						activeOpacity={0.8}>
						<Text style={styles.buttonText}>登录</Text>
					</TouchableOpacity>
					<Text style={styles.registerText} onPress={this.register}>
						还未注册？点击创建账号
					</Text>
				</View>
			</Image>
		)
	}
}

let styles = StyleSheet.create({
	backgroundImg: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		justifyContent: 'center',
	},
	container: {
		backgroundColor: '#ffffff',
		opacity: 0.8,
		borderRadius: 10,
		marginHorizontal: 20,
		paddingHorizontal: 15,
		paddingVertical: 20,
	},
	button: {
		backgroundColor: '#5e6be5',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 14,
		borderRadius: 20,
		opacity: 1,
		marginBottom: 10,
	},
	buttonText: {
		color: 'white',
	},
	registerText: {
		textAlign: 'center',
		color: '#FC225B',
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
		letterSpacing: 20,
	}
})