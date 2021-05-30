locker = new Locker(locker_addr)

window.onload = async () => {
  locker.hook_login = load_data
  document.getElementById('authentication').style.display = 'block'
  locker.check_login()
}

async function load_data(){
  draw_profile()
  load_notebook()
}

async function draw_profile(){
  locker.get_json_file('~/r/userinfo.json', data => {
    document.getElementById("profile").innerText = `Hello, ${data['name']} <${data['email']}>!`
  })
}

async function load_notebook(){
  locker.get('~/rw/notebook.txt')
    .then(response => {
      return response.text()
    })
    .then(text => {
      document.getElementById("notebook").value = text
    })
    .catch(e => {
      console.log("no notebook", e)
    })
}

function modified(){
  document.getElementById("btn-save").disabled = false
  document.getElementById("notebook").onkeyup = null
}

async function save(){
  data = document.getElementById("notebook").value
  //console.log("data", data)
  locker.put('~/rw/notebook.txt', data)
  .then( r => {
    document.getElementById("btn-save").disabled = true
    document.getElementById("notebook").onkeyup = modified
  })
  .catch( e => {
    console.log("put catch", e)
  })
  locker.set_flag('myflag')
}

async function logout(){
  locker.logout()
}

