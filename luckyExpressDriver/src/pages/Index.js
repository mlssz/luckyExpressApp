import React from 'react';
import {
	Tabs,
	Tab,
	Icon
} from 'react-native-elements';
import ReceiveOrder from './ReceiveOrder.js'
import OrderManage from './OrderManage.js'
import NoPage from './NoPage.js'

export default class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'shortOrder',
		}
		this.changeTab = this.changeTab.bind(this);
	}

	changeTab(tab) {
		this.setState({
			selectedTab: tab
		})
	}

	render() {
		let selectedTab = this.state.selectedTab;
		return (
			<Tabs>
				<Tab
					selected={selectedTab === 'shortOrder'}
					title={selectedTab === 'shortOrder' ? '接单' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='list-alt' size={33} type='font-awesome'/>}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='list-alt' size={30} type='font-awesome'/>}
					onPress={() => this.changeTab('shortOrder')}>
					<ReceiveOrder navigator={this.props.navigator}/>
				</Tab>
				<Tab
					selected={selectedTab === 'longOrder'}
					title={selectedTab === 'longOrder' ? '长期接单' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='local-offer' size={33}/>}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='local-offer' size={30}/>}
					onPress={() => this.changeTab('longOrder')}>
					<NoPage navigator={this.props.navigator}/>
				</Tab>
				<Tab
					selected={selectedTab === 'orderCorl'}
					title={selectedTab === 'orderCorl' ? '订单管理' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='event-note' size={33}/>}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='event-note' size={30}/>}
					onPress={() => this.changeTab('orderCorl')}>
					<OrderManage navigator={this.props.navigator}/>
				</Tab>
				<Tab
					selected={selectedTab === 'self'}
					title={selectedTab === 'self' ? '个人' : null}
					renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='person-outline' size={33}/>}
					renderSelectedIcon={() => <Icon color={'#6296f9'} name='person-outline' size={30}/>}
					onPress={() => this.changeTab('self')}>
					<NoPage />
				</Tab>
			</Tabs>
		)
	}
}