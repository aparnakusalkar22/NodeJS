const express = require('express');
const parser = require('body-parser');
const app = express();
const mysql = require('mysql');

//parse application to json data
app.use(parser.json());

//create db connection
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Admin@123',
    database:'person'
});

//validate connection
con.connect((err) =>{
    if(err) throw err;
    console.log('Mysql connected....');
});

//list all person details
//app.get(uri,callback_fun)
app.get('/bajaj/persons',(request,response)=>{
    let sql = 'select * from person';
    con.query(sql,(err,result)=>{
        if(err) throw err;
        response.send(JSON.stringify({"status":200,"error":null,"response":result}));
    });
});

//show single record of product
app.get('/bajaj/persons/:id',(request,response)=>{
    let sql = 'select * from person where id ='+request.params.id;
    
    let query = con.query(sql,(err,result)=>{
        if(err)
            throw err;
        response.send(result);
    });
});

//insert 
app.post('/bajaj/persons',(request,response)=>{
    let data = {name:request.body.name,address:request.body.address,mobile:request.body.mobile,email:request.body.email,age:request.body.age,dob:request.body.dob};
    let sql = 'insert into person SET ?';
    let query = con.query(sql,data,(err,result)=>{
        if(err)
            throw err;
        else if (result.affectedRows>0)
            response.send('Person details inserted with '+result.insertId);
    });
});

//edit
app.put('/bajaj/persons/:id',(request,response)=>{
    let sql = 'update person set name='+request.body.name+',address='+request.body.address+',mobile='+request.body.mobile+',email='+request.body.email+',age='+request.body.age+',dob='+request.body.dob+'where id='+request.params.id;
    let query = con.query(sql,data,(err,result)=>{
        if(err)
            throw err;
        response.send(result);
    });
});

//delete data 
app.delete('/bajaj/persons/:id',(request,response)=>{
    let sql = 'delete from person where id='+request.params.id;
    let query = con.query(sql,data,(err,result)=>{
        if(err)
            throw err;
        response.send(result);
    });
});

app.listen(3000,()=>{
    console.log('console started on port 3000');
});
