
function statusChangeCallback(response) {
  if (response.status === 'connected') {
    console.log('hasil response dari getLoginStatus --->', response)
    // localStorage.setItem('token', response.authResponse)
    // localStorage.setItem('idFB', response.authResponse.userID)
    if (window.location.href !== 'https://localhost:8080/todolist.html') {
      window.location.href="todolist.html"
    }
    testAPI();
  } else {
    if (window.location.href !== 'https://localhost:8080/index.html') {
      window.location.href="index.html"
    }

  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log('hasil response dari checkLoginState  -- checkLoginState', response)
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '680494182296589',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    // statusChangeCallback(response);
  });

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
  FB.api('/me', {fields: ['id','name']}, function(response) {

    let obj ={
      email: response.email,
      idFB: response.id,
      name: response.name
    }
    axios.post('http://localhost:3000/login', {
      obj
    },{})
    .then((res)=>{
      console.log('res dari testAPI axios', res)
      localStorage.setItem('token', res.data.token);
    })
    .catch((err)=>{
      console.log('ini error login------->',err);
    });
  });
}
