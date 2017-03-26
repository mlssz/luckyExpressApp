export default class ws {

	constructor(url) {
		this.ws = new WebSocket(url);
	}

	init(func, render) {
		let ws = this.ws;
		ws.onopen = () => {
			console.log('start ws!');
			func();
		}

		ws.onerror = (e) => {
			console.warn('error:', e.message);
		}

		ws.onclose = (e) => {
			console.log(e.code, e.reason);
		}

		ws.onmessage = (e) => {
			console.log(e.data)
			let data = JSON.parse(e.data);
			render(data.orders)
		}
	}

	send(data) {
		console.log('send', data);
		this.ws.send(JSON.stringify(data));
	}

	close() {
		this.ws.close();
	}

}