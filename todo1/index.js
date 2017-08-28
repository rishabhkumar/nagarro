const todo_db = require('./seed')

const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use('/', express.static(__dirname + '/public'))

// console.log(todo_db)

app.get('/api/todos', (req, res) => {
    let obj = {
        todo: todo_db.todos,
        next_id: todo_db.next_todo_id
    }
    res.json(obj)
})

app.get('/api/add', (req, res) => {
    let data = req.param('data')
    // console.log('hey' + data)
    // console.log(req)
    todo_db.todos[todo_db.next_todo_id] = {title: data, status: todo_db.StatusENUMS.ACTIVE}
    todo_db.next_todo_id++
    // res.send('ho gya ' + req.param('data'))
})

app.delete('/api/delete/:id', (req, res) => {
    var id = req.params.id
    let obj = todo_db.todos[id]

    if(!obj) {
        res.status(400).json({error: 'Ghatiya ID bro'})
    }
    else {
        obj.status = todo_db.StatusENUMS.DELETED
    }
})

app.put('/api/update/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
    let obj = todo_db.todos[id]
    obj.status = todo_db.StatusENUMS.COMPLETE
})
// let a
app.listen(3000, (req, res) => {
    console.log('Server up and running  at http://localhost:3000')
})