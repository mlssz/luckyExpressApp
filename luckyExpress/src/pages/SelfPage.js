import React from 'react';
import {
	ScrollView,
	AsyncStorage
} from 'react-native'
import {
	List,
	ListItem
} from 'react-native-elements'
import Storage from 'react-native-storage';
import config from '../config.js'
import Login from './Login.js'
import NoPage from './NoPage.js'
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
		if (navigator && !this.state.token) {
			navigator.push({
				component: Login,
			})
		} else if (navigator) {
			navigator.push({
				component: NoPage,
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
		this.setState({
			phone: arr.phone,
			token: arr.token,
		})
	}

	componentWillMount() {
		storage.load({
				key: 'loginState'
			})
			.then((res) => this.validLogin(res))
			.catch(res => console.warn(res.message))
	}

	render() {
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
						underlayColor='gray'
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
var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,
});