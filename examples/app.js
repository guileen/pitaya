var connect = require('connect');
var pitaya = require('../lib/pitaya');
var app = pitaya();

app.tcp.use(function(req, res, next) {
    console.log('TCP logger: ', req.url, req.message);
    next();
});

app.http
  .use(connect.cookieParser('tobo!'))
  .use(connect.session());

app.get('/', function(req, res) {
    res.data({
        ret: 0,
        msg: 'hello'
    })
});

app.get('/login', function(req, res) {
    var userid = req.param('userid');
    var password = req.param('password');
    if(password == '1234') {
      console.log('login as:' + userid);
      req.session.userid = userid;
      res.data({ret: 0, msg: 'login successfully'});
    } else {
      res.data({ret: -1, msg: 'wrong password'});
    }
});

app.get('/friends', requireLogin, function(req, res) {
    var userid = req.param('id');
    res.data({
        id: req.session.userid,
        friends:[1,2,3,4,5,6,7,10, 1000, 2000, 12341123]
    });
})

function requireLogin(req, res, next) {
  if(!req.session.userid) {
    res.data({ret: -1, msg: 'require login'});
  } else {
    next();
  }
}

app.httpServer.listen(3000);
app.tcpServer.listen(4000);
