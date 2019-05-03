$(document).ready(function() {
  $("#ship_capacity_input").submit((e) => {
    event.preventDefault()
    
    let capacity = $( "input:first" ).val();
    let data = JSON.stringify({ capacity });
    
    postData('/', data)
      .then((matches) => {
        appendData(matches)
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

  function appendData(matches) {
    $("#pilot_ship_matches").empty();
    
    for(let i = 0; i < matches.length; i++) {
      let match = matches[i];
      $("#pilot_ship_matches").append(`<p>${match}</p`)
    }
  }
});



