const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port =process.env.PORT||3000;


var app=express();



hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname+'/vi  ews'));


app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now} :${req.method} ${req.url}`;
console.log(log);

fs.appendFile('Server.log',log +'\n',(err)=>{
	if(err){
		console.log('Unable to append to Server .log');
	}
});

next();
});

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();   
});



app.get('/',(req,res)=>{
res.render('home.hbs',{
	pageTitle:'Home Page',
	welcomemessage: 'hey ur on Home Page',

});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
	pageTitle:'About Page'

});
});

app.get('/project',(req,res)=>{
res.render('project.hbs');
pageTitle:'Project Page'
});

app.get('/bad',(req,res)=>{
res.send({
	erroeMessage:'Unable to send data',

});
});



app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});