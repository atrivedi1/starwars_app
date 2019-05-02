$(document).ready(function() {
  $("#ship_capacity_input").submit((e) => {
    event.preventDefault()
    
    let capacity = $( "input:first" ).val();
    let data = JSON.stringify(capacity);
    
    postData('/', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  })

  function postData(url = '/', data = {}) {
    return fetch('/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: data
    })
    .then((res) => {
      return res.json()
    })
  }
});



