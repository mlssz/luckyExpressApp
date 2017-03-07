import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Picker
} from 'react-native';
import FormElement from '../component/FormElement.js';
import UpLoadBlock from '../component/UpLoadBlock.js'
import TopBar from '../component/TopBar.js';
import config from '../config.js'

let cars = config.cars;

export default class CompleteInf extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			idNumber: '',
			carType: '',
		}
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

	render() {
		return (
			<ScrollView>
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
					<UpLoadBlock name='上传车辆正面照片' buttonStyle={styles.buttonStyle_one}/>
					<UpLoadBlock name='上传车辆登记证书' buttonStyle={styles.buttonStyle_two}/>
					<UpLoadBlock name='上传司机驾驶证照片' buttonStyle={styles.buttonStyle_three}/>
				</View>
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
	}
})