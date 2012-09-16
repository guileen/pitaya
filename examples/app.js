var pitaya = require('../lib/pitaya');
var app = pitaya();

app.get('/', function(req, res) {
    res.data({
        ret: 0,
        msg: 'hello'
    })
});

app.httpServer.listen(3000);
app.tcpServer.listen(4000);
