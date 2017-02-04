import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import {
	Tabs,
	Tab,
	Icon
} from 'react-native-elements'
import SelectCar from './SelectCar.js'
import SelfPage from './SelfPage.js'
import NoPage from './NoPage.js'

export default class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'self'
		}
	}

	render() {
		return (
			<Tabs>
				<Tab
					title={this.state.selected==='selectCar'?'选车':null}
					selected = {this.state.selected==='selectCar'}
					renderIcon={()=><Icon name='local-shipping' color='gray'/>}
					renderSelectedIcon={()=><Icon name='local-shipping' color='black'/>}
					onPress={()=>{this.setState({selected:'selectCar'})}}
				>
				<SelectCar navigator={this.props.navigator} name={this.state.selected}/>
				</Tab>
				<Tab
					title={this.state.selected==='callCar'?'叫车':null}
					selected = {this.state.selected==='callCar'}
					renderIcon={()=><Icon name='place' color='gray'/>}
					renderSelectedIcon={()=><Icon name='place' color='black'/>}
					onPress={()=>{this.setState({selected:'callCar'})}}
				>
				<NoPage navigator={this.props.navigator} name={this.state.selected}/>
				</Tab>
				<Tab
					title={this.state.selected==='order'?'订单':null}
					selected = {this.state.selected==='order'}
					renderIcon={()=><Icon name='assignment' color='gray'/>}
					renderSelectedIcon={()=><Icon name='assignment' color='black'/>}
					onPress={()=>{this.setState({selected:'order'})}}
				>
				<NoPage navigator={this.props.navigator} name={this.state.selected}/>
				</Tab>
				<Tab
					title={this.state.selected==='self'?'个人':null}
					selected = {this.state.selected==='self'}
					renderIcon={()=><Icon name='perm-identity' color='gray'/>}
					renderSelectedIcon={()=><Icon name='perm-identity' color='black'/>}
					onPress={()=>{this.setState({selected:'self'})}}
				>
				<SelfPage navigator={this.props.navigator} name={this.state.selected}/>
				</Tab>
			</Tabs>
		)
	}
}