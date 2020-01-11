const  express=require('express')

const app=express();

const path=require('path')

const exphbs=require('express-handlebars')

const request=require('request');

const bodyparser=require('body-parser');



const  PORT=process.env.PORT||5000;

app.use(bodyparser.urlencoded({extended:false}));
//api key pk_fd99e4b4ce144bad8f6e69b45b33276e
function request_api(finishedAPI,ticker) {
    request("https://cloud.iexapis.com/stable/stock/"+ticker+"/quote?token=pk_fd99e4b4ce144bad8f6e69b45b33276e",{json:true},(err,res,body)=>{
        if(err)  throw err;
        if(res.statusCode===200){
            finishedAPI(body);
        }
    })
}

const otherstuff="Hello there,this is other stuffs";
//set handlebars middleware
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
//set  handlebars get route

app.get('/',(req,res)=>{
    request_api(function (doneAPI) {
        res.render('home',{
            stock:doneAPI
        });
    },"fb")

});

//set handlebars post route
app.post('/',(req,res)=>{
    request_api(function (doneAPI) {
        //posted_stuff=req.body.stock_ticker
        res.render('home',{
            stock:doneAPI

        });
    },req.body.stock_ticker);

});
//about route
app.get('/about.html',(req,res)=>{

    res.render('about');
});
//static folder
app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,()=>console.log(PORT));