const  express=require('express')

const app=express();

const path=require('path')

const exphbs=require('express-handlebars')

const  PORT=process.env.PORT||5000;

const otherstuff="Hello there,this is other stuffs";
//set handlebars middleware
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
//set  handlebars route
app.get('/',(req,res)=>{
    res.render('home',{
        stuff:otherstuff
    });
});
//static folder
app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,()=>console.log(__dirname));