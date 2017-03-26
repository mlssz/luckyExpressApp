import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import {
	Icon
} from 'react-native-elements';
import RoadItem from './RoadItem.js'
export default class Road extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roads: this.props.roads,
			changeRoads: this.props.changeRoads,
		};
		this.changeRoad = this.changeRoad.bind(this);
		this.addRoad = this.addRoad.bind(this);
		this.deleteRoad = this.deleteRoad.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			roads: nextProps.roads
		})
	}

	changeRoad(road, index) {
		let roads = this.state.roads;
		roads[index] = road;
		this.setState({
			roads: roads,
		})
		this.state.changeRoads(roads);
	}

	deleteRoad(index) {
		let roads = this.state.roads;
		roads.splice(index, 1);
		this.setState({
			roads: roads,
		})
		this.state.changeRoads(roads);
	}

	addRoad() {
		let roads = this.state.roads;
		let road = {
			name: '',
			position: '',
		}
		roads.push(road);
		this.setState({
			roads: roads,
		})
		this.state.changeRoads(roads);
	}
	renderRoads() {
		let roads = this.state.roads;
		let length = roads.length;
		let randKey = Math.random() * 10000;
		return roads.map((ele, i) => {
			return <RoadItem 
					road={ele} 
					canDelete={i!==0&&i!==(length-1)} 
					key={randKey+i} 
					index={i} 
					changeRoad={this.changeRoad} 
					deleteRoad={this.deleteRoad}
					navigator={this.props.navigator}/>
		})
	}

	render() {
		return (
			<View style={styles.roadView}>
				<View style={styles.roadTop}>
					<Icon name='map'/>
					<View style={styles.usualRoad}>
						<TouchableOpacity style={styles.usualRoadButton} activeOpacity={0.6}>
							<Icon name='expand-more' color='white'/>
							<Text>启用常用路线</Text>
						</TouchableOpacity>
					</View>
				</View>

				{this.renderRoads()}

				<View style={{flexDirection:'row',alignItems:'center',marginTop:10}}>
					<TouchableOpacity 
						style={styles.addRoadButton} 
						activeOpacity={0.6}
						onPress={this.addRoad}>
						<Icon name='add' color='white'/>
						<Text>添加目的地点</Text>
					</TouchableOpacity>
					<Text style={{fontSize:10}}>请按卸货顺序填写以便估计价格</Text>				
				</View>

			</View>
		)
	}
}

let styles = StyleSheet.create({
	roadView: {
		backgroundColor: '#FFFFFF',
		padding: 10,
		marginBottom: 10,
	},
	roadTop: {
		flexDirection: 'row'
	},
	usualRoad: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	usualRoadButton: {
		flexDirection: 'row',
		backgroundColor: 'blue',
		alignItems: 'center',
		paddingLeft: 40,
		paddingRight: 40,
		borderRadius: 5,
	},
	usualRoadText: {
		color: 'white',
		marginLeft: 5,
	},
	addRoadButton: {
		flexDirection: 'row',
		backgroundColor: 'blue',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 5,
		marginRight: 15,
	}
})