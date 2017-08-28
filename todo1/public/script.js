function getTodosAJAX() {
    ajaxWork('/api/todos', 'GET', placeOnDOM)
}

function ajaxWork(url,  method, fnc) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status ==  200) {
            fnc(xmlhttp.responseText)
            console.log(xmlhttp.responseText)
        }
    }
    xmlhttp.open(method, url, true)
    xmlhttp.send()
}

function placeOnDOM(jsonArray) {
    var jsonObject = JSON.parse(jsonArray)
    // console.log(jsonObject)
    var length = jsonObject.next_id
    var a = document.getElementById('todos_list')
    var b = '<ul>'
    for(var i = 1; i<length; i++) {
        if(jsonObject.todo[i].status != 'DELETED') {
            if(jsonObject.todo[i].status == 'ACTIVE') {
                b += '<li>' + jsonObject.todo[i].title + "<button onclick='complete("+i+")'>Completed</button><button onclick='deleteItem("+i+")'>Delete</button></li>"
            }
            if(jsonObject.todo[i].status == 'COMPLETE') {
                b += '<li style="color: green;">' + jsonObject.todo[i].title + " (COMPLETED)</li>"
            }
        }
    }
    b += '</ul>'
    a.innerHTML = b
}

function complete(id) {
    ajaxWork('/api/update/' + id, 'PUT', lol)
}

function deleteItem(id) {
    ajaxWork('/api/delete/' + id, 'DELETE', lol)
}

function addTodo() {
    var a = document.getElementById('tf1').value;
    addTodosAJAX(a)
}

function lol() {

}

function addTodosAJAX(data) {
    ajaxWork('http://localhost:3000/api/add?data='+data, 'GET', lol)
}