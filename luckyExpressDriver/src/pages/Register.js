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
import TopBar from '../component/TopBar.js'
import CompleteInf from './CompleteInf.js'
import {
	Geolocation
} from 'react-native-baidu-map'
import config from '../config.js'
let api = config.api;

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			code: '',
			codeButtonContent: '获取验证码',
			codeButtonDisabled: true,
			err: ' ',
		}
		this.renderRightEle = this.renderRightEle.bind(this);
		this.completeInf = this.completeInf.bind(this);
		this.enterPhone = this.enterPhone.bind(this);
		this.getCode = this.getCode.bind(this);
		this.goNextPage = this.goNextPage.bind(this);
		this.changeCodeButton = this.changeCodeButton.bind(this);
	}

	renderRightEle() {
		let backgroundColor = this.state.codeButtonDisabled ? 'gray' : '#FD225B';
		return (
			<TouchableOpacity 
				style={[styles.getCodeButton,{backgroundColor:backgroundColor}]}
				disabled={this.state.codeButtonDisabled}
				onPress={this.getCode}>
				<Text style={styles.buttonText}>{this.state.codeButtonContent}</Text>
			</TouchableOpacity>
		)
	}

	changeCodeButton(times) {
		if (times > 0) {
			this.setState({
				codeButtonContent: times + 's后获取验证码'
			});
		} else {
			this.setState({
				codeButtonContent: '获取验证码',
				codeButtonDisabled: false,
			});
		}
		setTimeout(() => this.changeCodeButton(--times), 1000)
	}

	getCode() {
		let url = api.getCode + '?phone=' + this.state.phone;
		fetch(url)
			.then((res) => res.text())
			.then((res) => console.log(res));
		this.setState({
			codeButtonDisabled: true
		})
		this.changeCodeButton(60)
	}

	async register(position) {
		let phone = 'phone=' + this.state.phone;
		let positionX = '&positionx=' + position.coords.latitude;
		let positionY = '&positiony=' + position.coords.longitude;
		let code = '&code=' + this.state.code;
		let psw = '&password=' + this.state.phone;
		let body = phone + positionY + positionX + code + psw;
		let url = api.register;
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
				let id = data.lessee.id;
				let phone = data.lessee.account;
				let token = data.lessee.token;
				storage.save({
					key: 'loginState',
					rawData: {
						phone: phone,
						id: id,
						token: token,
						position: JSON.stringify([position.coords.latitude, position.coords.longitude])
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

	completeInf() {
		navigator.geolocation.getCurrentPosition(
			(data) => this.register(data),
			(error) => alert(error.message), {
				enableHighAccuracy: false,
				timeout: 20000,
				maximumAge: 1000
			}
		);
	}

	enterPhone(phone) {
		this.setState({
			phone
		});
		if (phone.length === 11)
			this.setState({
				codeButtonDisabled: false
			})
		else if (!this.state.codeButtonDisabled)
			this.setState({
				codeButtonDisabled: true
			})
	}

	render() {
		return (
			<Image source={require('../img/bg_1.png')} style={styles.backgroundImg}>
				<TopBar title='创建账号' navigator={this.props.navigator} back />
				<View style={styles.screen}>
					<View style={styles.container}>
						<FormElement 
							formInput='手机号' 
							placeholder='11位数字'
							maxLength={11}
							value={this.state.phone}
							keyboardType='numeric'
							onChangeText={(phone)=>this.enterPhone(phone)}/>
						<FormElement 
							formInput='验证码' 
							placeholder='6位数字'
							value={this.state.code}
							onChangeText={(code)=>this.setState({code})}
							maxLength={6}
							keyboardType='numeric'
							rightEle={this.renderRightEle()}/>
						<Text style={{textAlign:'center',color:'red'}}>{this.state.err}</Text>
						<TouchableOpacity 
							style={styles.button}
							activeOpacity={0.8}
							onPress={this.completeInf}>
							<Text style={styles.buttonText}>创建账号</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Image>
		)
	}
}

let styles = StyleSheet.create({
	backgroundImg: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	screen: {
		flex: 1,
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
	getCodeButton: {
		padding: 10,
		borderRadius: 20,
	}
})

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
});