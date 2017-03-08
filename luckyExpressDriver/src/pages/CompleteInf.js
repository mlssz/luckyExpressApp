import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Picker,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage'
import {
	Icon
} from 'react-native-elements';
import FormElement from '../component/FormElement.js';
import UpLoadBlock from '../component/UpLoadBlock.js'
import TopBar from '../component/TopBar.js';
import config from '../config.js'
import NoPage from './NoPage.js'

let cars = config.cars;
let api = config.api;

export default class CompleteInf extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'sw',
			idNumber: '111111111111111111',
			carType: '',
			token: '',
			phone: '',
			id: '',
			avatarSources: [null, null, null],
			err: ' ',
		}
		this.renderSelect = this.renderSelect.bind(this);
		this.addPic = this.addPic.bind(this);
		this.upLoadPic = this.upLoadPic.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.isErr = this.isErr.bind(this);
		this.upLoadInf = this.upLoadInf.bind(this);
	}

	componentWillMount() {
		storage.load({
			key: 'loginState'
		}).then((res) => {
			this.setState({
				id: res.id,
				token: res.token,
				phone: res.phone,
			})
		}).catch((err) => console.log(err));
	}

	renderSelect() {
		return (
			<Picker
				selectedValue={this.state.carType}
				onValueChange={(carType) => this.setState({carType})}>
				{
					cars.map((car)=><Picker.Item label={car.name} value={car.name} key={car.name}/>)
				}
			</Picker>
		)
	}

	nextPage() {
		if (!this.isErr())
			return false;
		let avatarSources = this.state.avatarSources;
		for (formData of avatarSources) {
			if (formData !== null)
				this.upLoadPic(formData);
		}
		this.upLoadInf();
		let navigator = this.props.navigator;
		navigator.push({
			component: NoPage,
		})
	}

	addPic(avatarSource, index = 0) {
		let avatarSources = this.state.avatarSources;
		avatarSources[index] = avatarSource;
		this.setState({
			avatarSources
		});
	}

	upLoadInf() {
		let id = 'uid=' + this.state.id;
		let token = '&token=' + this.state.token;
		let nickname = '&nickname=undefined';
		let realname = '&realname=' + this.state.name;
		let ci = '&ci=' + this.state.idNumber;
		let body = id + token + nickname + realname + ci;
		fetch(api.completeInf, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: body,
			})
			.then((res) => res.text())
			.then((res) => console.log(res));
	}

	upLoadPic(formData) {
		fetch(api.upLoad, {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: formData
			})
			.then((response) => response.text())
			.then((responseData) => {
				console.log('responseData', responseData);
			})
			.catch((error) => {
				console.error('error', error);
			});
	}

	isErr() {
		let name = this.state.name;
		let idNumber = this.state.idNumber;
		let carType = this.state.carType;
		let avatarSources = this.state.avatarSources;
		if (!name && !idNumber && !carType) {
			this.setState({
				err: '请填写完整！'
			});
			return false;
		}
		for (avatarSource of avatarSources) {
			if (avatarSource === null) {
				this.setState({
					err: '请上传图片！'
				});
				return false;
			}
		}
		return true;
	}

	render() {
		return (
			<ScrollView
				keyboardDismissMode='on-drag'>
				<TopBar title='填写资料' navigator={this.props.navigator} back/>
				<View style={styles.container}>
					<FormElement 
						formInput='真实姓名' 
						placeholder='请填中文'
						value={this.state.name}
						onChangeText={(name)=>this.setState({name})}
						underlineColorAndroid='#EDEDED'
						column/>
					<FormElement 
						formInput='身份证号码' 
						placeholder='请填18位或15位数字或X'
						value={this.state.idNumber}
						onChangeText={(idNumber)=>this.setState({idNumber})}
						underlineColorAndroid='#EDEDED'
						column/>
					<FormElement 
						formInput='货车型号' 
						placeholder='请选择'
						value={this.state.carType}
						underlineColorAndroid='#EDEDED'
						rightEle={this.renderSelect()}
						column
						noInput/>
					<UpLoadBlock 
						name='上传车辆正面照片'
						index={0}
						buttonStyle={styles.buttonStyle_one}
						id={this.state.id}
						token={this.state.token}
						type='zmz'
						addPic={this.addPic}/>
					<UpLoadBlock 
						name='上传车辆登记证书' 
						index={1}
						buttonStyle={styles.buttonStyle_two}
						id={this.state.id}
						token={this.state.token}
						type='djz'
						addPic={this.addPic}/>
					<UpLoadBlock 
						name='上传司机驾驶证照片' 
						index={2}
						buttonStyle={styles.buttonStyle_three}
						id={this.state.id}
						token={this.state.token}
						type='jsz'
						addPic={this.addPic}/>
				</View>
				<Text style={{textAlign:'center',color:'red'}}>{this.state.err}</Text>
				<TouchableOpacity 
					style={styles.nextButton}
					onPress={this.nextPage}>
					<Icon name='navigate-next'/>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}

let styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	buttonStyle_one: {
		backgroundColor: '#6AE7C4'
	},
	buttonStyle_two: {
		backgroundColor: '#4FBBD6'
	},
	buttonStyle_three: {
		backgroundColor: '#BA92C3'
	},
	nextButton: {
		backgroundColor: '#FF0024',
		paddingVertical: 20,
	}
});

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
})