import React from 'react';
import {
	View,
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	Alert,
	AsyncStorage
} from 'react-native';
import {
	Button
} from 'react-native-elements';
export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			codeButtonColor: '#f55064',
			phone: '',
			code: '',
			codeButtonDisabled: true,
			loginButtonDisabled: true,
			phoneError: ' ',
			codeError: ' ',
		}
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

	getCode() {
		let phone = this.state.phone;
		if (phone.length != 11) {
			Alert.alert('错误！', '请输入正确的手机号！', );
		} else {
			Alert.alert('Tips', '模拟的验证码为123456');
		}
		return false;
	}

	codeIsTrue() {
		let code = this.state.code;
		if (code === '123456')
			return true;
		else
			return false;
	}

	login() {
		let phone = this.state.phone;
		if (phone.length != 11) {
			this.setState({
				phoneError: '请输入正确的手机号！'
			})
			return false
		}
		if (this.codeIsTrue()) {
			let token = 'lcjTem';
			let timestamp = new Date().getTime().toString();
			AsyncStorage.multiSet([
				['phone', phone],
				['token', token],
				['timestamp', timestamp]
			], () => console.log('loginSuccess'));
			this.props.navigator.pop();
		} else {
			this.setState({
				codeError: '请输入正确的验证码！'
			})
		}
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
						title='获取验证码'
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
						onPress={this.login.bind(this)}/>
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