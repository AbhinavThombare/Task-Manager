const cors = require('cors');
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const adminusers = fs.readFileSync('db.json');
const subadminusers = fs.readFileSync('subadmin.json');
const users = fs.readFileSync('userdb.json');
const tasks = fs.readFileSync('task.json');
var myAdmin = JSON.parse(adminusers)
var mySubAdmin = JSON.parse(subadminusers);
var myUsers = JSON.parse(users);
var myTasks = JSON.parse(tasks)
const { json } = require('body-parser');
const app = express().use(cors());
const merge = require('deepmerge')

//api's for Login

app.get('/api/allusers',(req,res) => {
    const temp = merge(myAdmin,mySubAdmin)
    const merged = merge(temp,myUsers)
    res.json(merged)
})

//api's for Sub-Admin
app.get('/api/getsubadmin', (req, res) => {
    res.json(mySubAdmin)
})

app.post('/api/getsubadmin', bodyParser.json(), (req, res) => {
    mySubAdmin.push(req.body.data);
    newdata = JSON.stringify(mySubAdmin);
    fs.writeFile("subadmin.json", newdata, err => {
        if (err) throw err;
    });
})

app.get('/api/getsubadmin/:id', (req, res) => {
    id = req.params.id
    res.json(mySubAdmin[id])
})

app.put('/api/getsubadmin/:id', bodyParser.json(), (req, res) => {
    id = req.params.id;
    data = req.body.data;
    mySubAdmin[id].name = data.name;
    mySubAdmin[id].email = data.email;
    mySubAdmin[id].password = data.password;
    mySubAdmin[id].role = data.role
    newdata = JSON.stringify(mySubAdmin);
    fs.writeFile("subadmin.json", newdata, err => {
        if (err) throw err;
    });
})

app.delete('/api/getsubadmin/delete/:id', (req, res) => {
    const id = req.params.id
    delete mySubAdmin[id];
    mySubAdmin.splice(id, 1)
    newdata = JSON.stringify(mySubAdmin);
    fs.writeFile("subadmin.json", newdata, err => {
        if (err) throw err;
    });
})


//api's for USERS

app.get('/api/getusers', (req, res) => {
    res.json(myUsers)
})

app.post('/api/getusers', bodyParser.json(), (req, res) => {
    myUsers.push(req.body.data);
    newdata = JSON.stringify(myUsers);
    fs.writeFile("userdb.json", newdata, err => {
        if (err) throw err;
    });
})

app.get('/api/getusers/:id', (req, res) => {
    id = req.params.id
    res.json(myUsers[id])
})

app.put('/api/getusers/:id', bodyParser.json(), (req, res) => {
    id = req.params.id;
    data = req.body.data;
    myUsers[id].name = data.name;
    myUsers[id].email = data.email;
    myUsers[id].password = data.password;
    myUsers[id].role = data.role
    newdata = JSON.stringify(myUsers);
    fs.writeFile("userdb.json", newdata, err => {
        if (err) throw err;
    });
})

app.delete('/api/getusers/delete/:id', (req, res) => {
    const id = req.params.id
    delete myUsers[id];
    myUsers.splice(id, 1)
    newdata = JSON.stringify(myUsers);
    fs.writeFile("userdb.json", newdata, err => {
        if (err) throw err;
    });
})


// api's for TASKS

app.get('/api/gettasks', (req, res) => {
    res.json(myTasks)
})

app.post('/api/gettasks', bodyParser.json(),(req,res) => {
    myTasks.push(req.body.data);
    newdata = JSON.stringify(myTasks);
    fs.writeFile("task.json", newdata, err => {
        if (err) throw err;
    });
})

app.get('/api/gettasks/:id', (req, res) => {
    id = req.params.id
    res.json(myTasks[id])
})

app.put('/api/gettasks/:id', bodyParser.json(), (req, res) => {
    id = req.params.id;
    data = req.body.data;
    myTasks[id].task = data.task;
    myTasks[id].assign = data.assign;
    myTasks[id].progress = data.progress;
    newdata = JSON.stringify(myTasks);
    fs.writeFile("task.json", newdata, err => {
        if (err) throw err;
    });
})

app.delete('/api/gettasks/delete/:id', (req, res) => {
    const id = req.params.id
    delete myTasks[id];
    myTasks.splice(id, 1)
    newdata = JSON.stringify(myTasks);
    fs.writeFile("task.json", newdata, err => {
        if (err) throw err;
    });
})

//api's for User's Task

app.get('/api/tasks/:user',(req,res) => {
    var username = req.params.user;
    var myUserTask = myTasks.filter((item) => {
        if(username == item.assign){
           return true;
        }
    })
    res.json(myUserTask)
})

app.put('/api/postProgress/:user/:tname',bodyParser.json(),(req,res) =>{
    tname = req.params.tname;
    data = req.body.data;
    myTasks.find((item) => {
        if( user===item.assign && tname == item.task){
           item.task = data.task,
           item.progress = data.progress
        }
    })
    newdata = JSON.stringify(myTasks)
    fs.writeFile("task.json", newdata, err => {
        if (err) throw err;
    });
})

app.get('/api/gettaskname/:user/:tname',bodyParser.json(),(req,res) => {
    tname = req.params.tname;
    user = req.params.user;
    var myUserTask = myTasks.filter((item) => {
        if( user === item.assign && tname === item.task){
            console.log(item.assign + " "+ item.task);
           return true;
        }
    })
    res.json(myUserTask)
})

app.post('/api/postSubTask/:user/:task',bodyParser.json(),(req,res)=>{
    user = req.params.user;
    task = req.params.task;
    subTask = req.body.subtask;
    myTasks.find((item) => {
        if( user===item.assign && task == item.task){
        sub = item.subTask;
        newsub = [...sub,...subTask];
        item.subTask = newsub;
        }
    })
    newdata = JSON.stringify(myTasks)
    fs.writeFile("task.json", newdata, err => {
        if (err) throw err;
    });

})

app.post('/api/updateSubTask/:user/:task',bodyParser.json(),(req,res) => {
    user = req.params.user;
    task = req.params.task;
    newsubTask = req.body.subtask;
    myTasks.find((item) => {
        if(user === item.assign && task === item.task){
            newsub = [...newsubTask];
            item.subTask = newsub
        }
    })
    newdata = JSON.stringify(myTasks)
    fs.writeFile("task.json", newdata, err => {
        if (err) throw err;
    });
})

//api for forgot password 
app.get('/api/getuser/:user/:email',bodyParser.json(),(req,res) => {
    user = req.params.user;
    email = req.params.email;
    var found = 'false';
    myUsers.find((item) => {
        if(user === item.name && email === item.email){
            found = 'true'
        }
    })
    if(found === 'true'){
        res.send('true')
    }
    else{
        res.send('false')
    }
})

app.put('/api/updateuser/:user/:email',bodyParser.json(),(req,res) => {
    user = req.params.user;
    email = req.params.email;
    data = req.body.data;
    myUsers.find((item) => {
        if(user === item.name && email === item.email){
            item.password = data.password
        }
    })
    newdata = JSON.stringify(myUsers);
    fs.writeFile("userdb.json", newdata, err => {
        if (err) throw err;
    });
})

//app start
module.exports = app.listen(3002, (req, res) => {
    console.log('Express API is running at port 3003');
})