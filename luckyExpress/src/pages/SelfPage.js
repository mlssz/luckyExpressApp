import React from 'react';
import {
	ScrollView,
	AsyncStorage
} from 'react-native'
import {
	List,
	ListItem
} from 'react-native-elements'
import config from '../config.js'
import Login from './Login.js'
export default class SelfPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: null,
			token: null,
		}
		this.validLogin = this.validLogin.bind(this);
	}

	renderRow(rowData, i) {
		return (
			<List key={i}>
				{rowData.map((data) =>
				<ListItem 
					title={data.title}
					leftIcon={{name:data.icon}}
					key={data.icon}
					onPress={()=>this.toPage(data.page,data.title)}
				/>)}
			</List>
		)
	}

	toPage(page, title) {
		let navigator = this.props.navigator;
		if (navigator) {
			navigator.push({
				name: title,
				component: page,
			})
		}
	}

	logIn() {
		let navigator = this.props.navigator;
		if (navigator) {
			navigator.push({
				component: Login,
			})
		}
	}

	renderGroup() {
		let lists = config.selfLists;
		return (
			lists.map((list, i) => this.renderRow(list, i))
		)
	}

	validLogin(arr) {
		if (!arr[0][1])
			return false;
		let phone = arr[0][1];
		let token = arr[1][1];
		let timestamp = Number.parseInt(arr[2][1]);
		let id = arr[3][1];
		let nowTime = new Date().getTime();
		let days = (nowTime - timestamp) / (1000 * 60 * 60 * 24);
		if (days >= 30)
			return false;
		AsyncStorage.setItem('timestamp', nowTime.toString());
		this.setState({
			phone,
			token
		})
	}

	render() {
		AsyncStorage.multiGet(['phone', 'token', 'timestamp', 'id']).then((arr) => this.validLogin(arr));
		let phone = this.state.phone;
		let token = this.state.token;
		return (
			<ScrollView>
				<List
					containerStyle={{borderTopWidth:0,borderBottomWidth:0,marginTop:0}}
				>
					<ListItem
						title={token===null?'登录':phone}
						hideChevron={true}
						containerStyle={{backgroundColor:'black'}}
						leftIcon={{
								name:'perm-identity',
								style:{fontSize:100,color:'white'}
						}}
						titleStyle={{fontSize:20,color:'white',marginLeft:50}}
						onPress={this.logIn.bind(this)}
					/>
				</List>
				{this.renderGroup()}
			</ScrollView>
		)
	}
}