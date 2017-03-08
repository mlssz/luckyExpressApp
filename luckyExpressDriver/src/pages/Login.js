import React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	StyleSheet,
	AsyncStorage,
	TouchableOpacity
} from 'react-native';
import Storage from 'react-native-storage';
import FormElement from '../component/FormElement.js'
import Register from './Register.js'
import CompleteInf from './CompleteInf.js';
import config from '../config.js'

let api = config.api;

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '18768115873',
			psw: '18768115873',
			err: ' ',
		}
		this.register = this.register.bind(this);
		this.readyLogin = this.readyLogin.bind(this);
		this.login = this.login.bind(this);
	}

	register() {
		let navigator = this.props.navigator;
		if (navigator)
			navigator.push({
				component: Register,
			})
	}

	async login(position) {
		let phone = 'phone=' + this.state.phone;
		let positionX = '&positionx=' + position.coords.latitude;
		let positionY = '&positiony=' + position.coords.longitude;
		let psw = '&password=' + this.state.phone;
		let body = phone + positionY + positionX + psw;
		let url = api.login;
		try {
			let res = await fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: body
			});
			var data = res.json();
		} catch (e) {
			console.log('error', e);
		}

		data.then((data) => {
			if (data.status === 0) {
				this.setState({
					err: data.msg
				});
			} else {
				let id = data.lessee.id.toString();
				let phone = data.lessee.account.toString();
				let token = data.lessee.token.toString();
				storage.save({
					key: 'loginState',
					rawData: {
						phone: phone,
						id: id,
						token: token,
					},
				});
				this.goNextPage();
			}
		})
	}

	goNextPage() {
		let navigator = this.props.navigator;
		if (navigator)
			this.props.navigator.push({
				component: CompleteInf,
			})
	}

	readyLogin() {
		navigator.geolocation.getCurrentPosition(
			(data) => this.login(data),
			(error) => alert(error.message), {
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000
			}
		);
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
					<Text style={{textAlign:'center',color:'red'}}>{this.state.err}</Text>
					<TouchableOpacity 
						style={styles.button}
						activeOpacity={0.8}
						onPress={this.readyLogin}>
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

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
})