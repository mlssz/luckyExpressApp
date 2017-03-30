import React from 'react';
import {
	View,
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	Alert,
	AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage';
import {
	Button
} from 'react-native-elements';
import config from '../config.js'
import SelfPage from '../App.js'
let api = config.api;

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			codeButtonColor: '#f55064',
			phone: '',
			code: '',
			codeButtonValue: '获取验证码',
			codeButtonDisabled: true,
			loginButtonDisabled: true,
			phoneError: ' ',
			codeError: ' ',
		}
		this.timeOutButton = this.timeOutButton.bind(this);
		this.doLogin = this.doLogin.bind(this);
	}

	changePhone(phone) {
		let codeButtonDisabled = true;
		if (phone.length === 11) {
			codeButtonDisabled = false;
		}
		this.setState({
			phone,
			codeButtonDisabled,
			phoneError: ' ',
		});

	}

	timeOutButton(t) {
		if (t >= 0) {
			this.setState({
				codeButtonValue: t + '秒后获取验证码'
			})
			setTimeout(() => this.timeOutButton(t - 1), 1000);
		} else {
			this.setState({
				codeButtonDisabled: false,
				codeButtonValue: '获取验证码'
			})
		}

	}

	getCode(t = 60) {
		let phone = this.state.phone;
		if (phone.length != 11) {
			Alert.alert('错误！', '请输入正确的手机号！', );
			return false;
		} else {
			fetch(api.getCode + '?phone=' + phone).then(e => e.text()).then(e => console.log(e))
			this.setState({
				codeButtonDisabled: true,
			})
			this.timeOutButton(60);
		}
		return true;
	}

	isLogin() {
		let phone = this.state.phone;
		if (phone.length != 11) {
			this.setState({
				phoneError: '请输入正确的手机号！'
			})
			return false
		}
		navigator.geolocation.getCurrentPosition(
			(data) => this.doLogin(data, phone),
			(err) => console.log(err), {
				enableHighAccuracy: false,
				timeout: 10000,
			}
		);

	}

	doLogin(data, phone) {
		let x = data.coords.latitude;
		let y = data.coords.longitude;
		let position = '&position=' + x + ',' + y;
		let code = '&code=' + this.state.code;
		let body = 'account=' + phone + position + code;
		fetch(api.login, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: body
			})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 1) {
					storage.save({
						key: 'loginState',
						rawData: {
							id: res.rental.id,
							token: res.rental.token,
							phone: phone,
							x: x,
							y: y,
						}
					})
					this.props.navigator.resetTo({
						component: SelfPage
					});
				} else {
					this.setState({
						codeError: res.msg
					})
				}
			});
	}

	render() {
		return (
			<View style={styles.form}>

				<View style={styles.formRow}>
					<Text>手机号</Text>
					<TextInput 
						underlineColorAndroid='transparent'
						value={this.state.phone}
						placeholder='11位数字'
						maxLength={11}
						onChangeText={this.changePhone.bind(this)}
						keyboardType='numeric'
						style={styles.formInput}/>
				</View>

				<View>
					<Text style={styles.errorText}>{this.state.phoneError}</Text>
				</View>

				<View style={styles.formRow}>
					<Text>验证码</Text>
					<TextInput 
						value={this.state.code}
						onChangeText={(code)=>this.setState({code})}
						placeholder='6位数字'
						underlineColorAndroid='transparent'
						keyboardType='numeric'
						style={styles.formInput}/>
					<Button
						title={this.state.codeButtonValue}
						borderRadius={20}
						backgroundColor={this.state.codeButtonColor}
						disabled={this.state.codeButtonDisabled}
						onPress={this.getCode.bind(this)}/>
				</View>

				<View>
					<Text style={styles.errorText}>{this.state.codeError}</Text>
				</View>

				<View style={styles.buttonRow}>
					<Button
						borderRadius={20}
						backgroundColor='#4192e3'
						title='登录'
						onPress={this.isLogin.bind(this)}/>
				</View>

			</View>
		)
	}
}

let width = Dimensions.get('window').width;
let styles = StyleSheet.create({
	form: {
		width: width - 40,
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 20,
		backgroundColor: '#ffffff',
		borderRadius: 15,
	},
	formRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	formInput: {
		flex: 1,
		padding: 5,
		marginLeft: 10,
		backgroundColor: '#606267',
		opacity: 0.8,
	},
	buttonRow: {
		marginTop: 20,
	},
	errorText: {
		color: 'red',
	}
})

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
});