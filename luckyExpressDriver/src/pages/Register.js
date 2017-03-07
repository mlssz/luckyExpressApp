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
import TopBar from '../component/TopBar.js'
import CompleteInf from './CompleteInf.js'

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			code: '',
		}
		this.renderRightEle = this.renderRightEle.bind(this);
		this.completeInf = this.completeInf.bind(this);
	}

	renderRightEle() {
		return (
			<TouchableOpacity style={styles.getCodeButton}>
				<Text style={styles.buttonText}>获取验证码</Text>
			</TouchableOpacity>
		)
	}

	completeInf() {
		let navigator = this.props.navigator;
		if (navigator)
			this.props.navigator.push({
				component: CompleteInf,
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
							onChangeText={(phone)=>this.setState({phone})}/>
						<FormElement 
							formInput='验证码' 
							placeholder='6位数字'
							value={this.state.code}
							onChangeText={(code)=>this.setState({code})}
							maxLength={6}
							rightEle={this.renderRightEle()}/>
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
		backgroundColor: '#FD225B',
		padding: 10,
		borderRadius: 20,
	}
})