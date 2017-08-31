const todo_db = require('./seed')

const express = require('express')
const bodyparser = require('body-parser')
const app = express()


function todosWork(url, statuses) {
        // let responseHTML = '<ul>'
        let responseHTML = []
        let length = todo_db.next_todo_id
        let k = 0
        for(var i = 1; i<length; i++) {
            if(todo_db.todos[i].status == statuses) {
                // responseHTML += '<li>' + todo_db.todos[i].title + '</li>'
                responseHTML[k++] = todo_db.todos[i].title
            }
        }
        // responseHTML += '</ul>'
        return(responseHTML)
}

let urlenc = bodyparser.urlencoded({extended: true})
app.use('/', express.static(__dirname + '/public'))

// console.log(todo_db)

app.get('/api/todos', (req, res) => {
    let obj = {
        todo: todo_db.todos,
        next_id: todo_db.next_todo_id
    }
    res.json(obj)
})

app.post('/api/todos', urlenc, (req, res) => {
    let data = req.body.data
    // console.log(data)
    // console.log('hey' + data)
    // console.log(req)
    todo_db.todos[todo_db.next_todo_id] = {title: data, status: todo_db.StatusENUMS.ACTIVE}
    todo_db.next_todo_id++
    res.send('Item has been added!')
    // res.send('ho gya ' + req.param('data'))
})

app.delete('/api/todos/delete/:id', (req, res) => {
    var id = req.params.id
    let obj = todo_db.todos[id]

    if(!obj) {
        res.status(400).json({error: 'Ghatiya ID bro'})
    }
    else {
        obj.status = todo_db.StatusENUMS.DELETED
    }
})

app.get('/api/todos/active', (req, res) => {
    res.send(todosWork('/api/get/active', 'ACTIVE'))
})

app.get('/api/todos/deleted', (req, res) => {
    res.send(todosWork('/api/todos/deleted', 'DELETED'))
})


app.get('/api/todos/complete', (req, res) => {
    res.send(todosWork('/api/todos/complete', 'COMPLETE'))
})


app.put('/api/todos/active/:id', (req,  res) => {
    let id = req.params.id
    let obj = todo_db.todos[id]
    obj.status = todo_db.StatusENUMS.ACTIVE
})



app.put('/api/todos/complete/:id', (req, res) => {
    let id = req.params.id
    // console.log(id)
    let obj = todo_db.todos[id]
    obj.status = todo_db.StatusENUMS.COMPLETE
})
// let a
app.listen(3000, (req, res) => {
    console.log('Server up and running  at http://localhost:3000')
})