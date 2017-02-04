import React from 'react';
import {
	Text,
	View
} from 'react-native';
import TopBar from '../component/TopBar.js'
export default class NoPage extends React.Component {
	render() {
		return (
			<View>
				<TopBar title='NoPage' back navigator={this.props.navigator}/>
				<Text>Page:{this.props.name}!</Text>
				<Text>There is no Page!!!</Text>
			</View>

		)
	}
}