let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let nodemailer = require('nodemailer');


let app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index', {title: 'Welcome'});
});

app.get('/about', function(req, res){
	res.render('about');
}); 

app.get('/contact', function(req, res){
	res.render('contact');
}); 

app.post('/contact/send', function(req, res){
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'Youremail@gmail.com',
			pass: 'YourPassword Here'
		},
		 tls:{
        rejectUnauthorized: false
    }
	});

	let mailOptions = {
		from: 'Patrick BIYAGA <biyagapatrick@gmail.com>',
		to: 'patricklemignon1@yahoo.fr',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000 ...');