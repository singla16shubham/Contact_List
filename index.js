const express=require('express');
const port=8000;
const path=require('path');


const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'))
// middleware1
// app.use(function(req,res,next){
//  console.log("Middleware1 called");
//  next();  //so that this middleware can move on to next middlewrae or to controller
// })
// 
var contactList=[
    {
        name:'Shubham',
        phone:'12345'
    },
    {
        name:'Harry',
        phone:'12456'
    },
    {
        name:'Tony',
        phone:'12567'
    }
]

app.get('/',function(req,res){
    // console.log(req);
    // console.log(__dirname);
    // res.send('Cool,it is working or is it?');
    Contact.find({},function(err,contacts){
        if(err)
        {
            return;
        }
        return res.render('home',{
            title:"Contact List ",
            contact_list: contacts
    })
   
    });
})
app.get('/practice',function(req,res){
    // console.log(req);
    // console.log(__dirname);
    // res.send('Cool,it is working or is it?');
    return res.render('practice',{title:'practice '});
})
app.post('/create-contact',function(req,res){
   
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone:req.body.phone
    //     }
    // )
    //To shorten above code
    // contactList.push(res.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log("Error in creating contact");
            return;
        }
        console.log("*****",newContact);
        return res.redirect('/');
    })
    // return res.redirect('/')
    // instead of / back can also be used in case there are longer URLS
})

app.get('/delete-contact/',function(req,res){
    // get the query from the url
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error");
            return;
        }
        return res.redirect('/');
    })
    // let phone=req.query.phone;
    // // Finding the index of the above phone number then removing it
    // let contactindex=contactList.findIndex(contact=> contact.phone==phone);
    // if(contactindex!=-1)
    // {
    //     contactList.splice(contactindex,1);
    // }
   
})





app.listen(port,function(err){
    if(err)
    {
        console.log('error in running the server',err);

    }
    console.log('Server is ruuning on :',port);
});