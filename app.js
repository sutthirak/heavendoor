var express = require('express')
var esprima = require('esprima')
var bodyParser = require('body-parser')
var multer = require('multer')
var uglifyjs = require("uglify-js")

var app = express();

app.use(bodyParser.text({type:'text/plain'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(multer());

app.post('/parse', function (req, res){
	try{
		esprima.parse(req.body)
		res.send('{status:"ok"}')
	}catch(ex){
		res.send('{status:"error",reason:'+JSON.stringify(ex)+'}')
	}
})

app.post('/minify',function (req, res){
	try{
		var result = uglifyjs.minify(req.body, {fromString: true});
		res.send(result.code)
	}catch(ex){
		console.log(ex)
	}
})

var server = app.listen(9001, function () {
	var host = server.address().address
	var port = server.address().port
	console.log('HeavenDoor listening at http://%s:%s', host, port)
})
