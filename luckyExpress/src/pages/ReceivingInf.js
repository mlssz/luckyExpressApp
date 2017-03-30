import React from 'react'
import {
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Text
} from 'react-native'
import TopBar from '../component/TopBar.js'
import SearchBar from '../component/SearchBar.js'
import config from '../config.js'

let api = config.api

export default class Receivinginf extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchPlace: this.props.road.name,
			result: [],
		}
		this.search = this.search.bind(this);
		this.renderResult = this.renderResult.bind(this);
		this.chooseRoad = this.chooseRoad.bind(this);
	}

	search(searchPlace) {
		let ak = '?ak=' + api.baiduAK;
		let query = '&query=' + searchPlace;
		let region = '&region=杭州市';
		let output = '&output=json';
		let city_limit = '&city_limit=true';
		let url = api.searchSuggestionPlace + ak + query + region + output + city_limit;
		let request = new XMLHttpRequest();
		request.open('GET', url);
		request.send();
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				return;
			}
			if (request.status === 200) {
				let res = JSON.parse(request.responseText);
				let result = res.result;
				this.setState({
					result
				})
			} else {
				console.warn('error');
			}
		};
		this.setState({
			searchPlace,
		})
	}

	chooseRoad(ele) {
		let road = {
			name: ele.name,
			position: '' + ele.location.lat + ',' + ele.location.lng
		}
		let navigator = this.props.navigator;
		let changeRoad = this.props.changeRoad;
		changeRoad(road);
		navigator.pop();
	}

	renderResult() {
		let result = this.state.result;
		return (
			result.map((ele) => {
				return (
					<TouchableOpacity 
						style={styles.placeItem}
						key={ele.uid}
						onPress={()=>this.chooseRoad(ele)}
						activeOpacity={0.6}>
						<Text style={{color:'black'}}>{ele.name}</Text>
						<Text style={{fontSize:10}}>{ele.city}{ele.district}</Text>
					</TouchableOpacity>
				)
			})
		)
	}

	render() {
		return (
			<ScrollView 
				style={{flex:1}}
				keyboardDismissMode='on-drag'
				keyboardShouldPersistTaps='always'>
				<TopBar title='收货信息' navigator={this.props.navigator} back/>
				<SearchBar 
					placeholder='请输入目的地' 
					value={this.state.searchPlace}
					onChangeText={(ele)=>this.search(ele)}/>

				{this.renderResult()}

			</ScrollView>
		)
	}
}

let styles = StyleSheet.create({
	placeItem: {
		padding: 10,
		borderBottomColor: '#EDEDED',
		borderBottomWidth: 1,
		borderStyle: 'solid',
	}
})