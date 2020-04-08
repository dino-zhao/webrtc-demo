const app = require('express')();
const wsInstance = require('express-ws')(app);

app.ws('/', ws => {
	ws.on('message', data => {
		// console.log(data)
		// 未做业务处理，收到消息后直接广播
		wsInstance.getWss().clients.forEach(server => {
			
			if (server !== ws) {
				server.send(data);
			}
		});
	});
});

app.get('/', (req, res) => {
	res.sendFile('./client/index.html', { root: __dirname });
});

app.get('/answer', (req, res) => {
	res.sendFile('./client/answer.html', { root: __dirname });
});
app.get('/offer', (req, res) => {
	res.sendFile('./client/offer.html', { root: __dirname });
});

app.listen(8080,()=>{
	console.log('在8080启动成功')
});