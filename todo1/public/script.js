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
    // var b = '<ul>'
    var b;
    for(var i = 1; i<length; i++) {
    // <a class="waves-effect waves-light btn-large">Button</a>
        if(jsonObject.todo[i].status != 'DELETED') {
            if(jsonObject.todo[i].status == 'ACTIVE') {
                // b += '<li>' + jsonObject.todo[i].title + "<a class=\"waves-effect waves-light btn-large\" onclick='complete("+i+")'>Completed</a><a class=\"waves-effect waves-light btn-large\" onclick='deleteItem("+i+")'>Delete</a></li>"
                b += '      <div class="row">\n' +
                    '        <div class="col s12 m6">\n' +
                    '          <div class="card blue-grey darken-1">\n' +
                    '            <div class="card-content white-text">\n' +
                    '              <span class="card-title">ACTIVE</span>\n' +
                    '              <p>'+jsonObject.todo[i].title+'</p>\n' +
                    '            </div>\n' +
                    '            <div class="card-action">\n' +
                    '              <a class="waves-effect waves-light btn-large" onclick="complete('+i+')">Completed</a>\n' +
                    '              <a class="waves-effect waves-light btn-large" onclick="deleteItem('+i+')">Delete</a>\n' +
                    '            </div>\n' +
                    '          </div>\n' +
                    '        </div>\n' +
                    '      </div>'
            }
            if(jsonObject.todo[i].status == 'COMPLETE') {
                // b += '<li style="color: green;">' + jsonObject.todo[i].title + " (COMPLETED)</li>"
                b += '      <div class="row">\n' +
                    '        <div class="col s12 m6">\n' +
                    '          <div class="card blue-grey darken-1">\n' +
                    '            <div class="card-content white-text">\n' +
                    '              <span class="card-title">COMPLETED</span>\n' +
                    '              <p>' + jsonObject.todo[i].title + '</p>\n' +
                    '            </div>\n' +
                    '            <div class="card-action">\n' +
                    '              <a class="waves-effect waves-light btn-large" onclick="deleteItem('+i+')">Delete</a>\n' +
                    // '              <a href="#">This is a link</a>\n' +
                    '            </div>\n' +
                    '          </div>\n' +
                    '        </div>\n' +
                    '      </div>'
            }
        }
    }
    // b += '</ul>'
    a.innerHTML = b
}

function complete(id) {
    ajaxWork('/api/todos/complete/' + id, 'PUT', lol)
    getTodosAJAX()
}

function deleteItem(id) {
    ajaxWork('/api/todos/delete/' + id, 'DELETE', lol)
    getTodosAJAX()
}

function lol() {

}

function addTodoAJAX() {
    var title = document.getElementById('ttf1').value;
    // alert(title)
    var xmlhttprequest = new XMLHttpRequest()
    xmlhttprequest.open('POST', '/api/todos', true)
    xmlhttprequest.setRequestHeader(
        'Content-type', 'application/x-www-form-urlencoded'
    )
    var data = 'data=' + encodeURI(title)
    xmlhttprequest.onreadystatechange = function () {
        if(xmlhttprequest.readyState == 4 && xmlhttprequest.status == 200)  {
            getTodosAJAX()
        }
    }
    xmlhttprequest.send(data)
}