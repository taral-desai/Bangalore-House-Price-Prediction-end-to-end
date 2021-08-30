function getBathValue() {
    var bath = document.getElementsByName("bath");
    for(var i in bath) {
      if(bath[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }

  function getBHKValue() {
    var bhk = document.getElementsByName("bhk");
    for(var i in bhk) {
      if(bhk[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
function getSqft() {
  var sqft1 = document.getElementById("sqft")
  return sqft1
}

function getlocation() {
  var loca = document.getElementById("location_li")
  return loca
}




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



let location_li = document.getElementById('location_li');

  const xhr = new XMLHttpRequest();
xhr.open('GET',`/api/get_location_names` , true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        arr = json.locations
       let all_locations =""
       arr.forEach(function(element){
        let locations = `<option>${element}</option>`
        all_locations += locations    
       });
       location_li.innerHTML = `<option selected>Select location</option>` + all_locations
       
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




let result = document.getElementById('result');
result.addEventListener('click', buttonClickHandler)


       
function buttonClickHandler() {



var sqft = getSqft();
var bhk = getBHKValue();
var bathrooms = getBathValue();
var loc = getlocation()
var outcome = document.getElementById("output")


const formData = new FormData();
const fileField = document.getElementById("form")

formData.append('total_sqft', parseFloat(sqft.value));
formData.append('location', loc.value);
formData.append('bhk', bhk);
formData.append('bath', bathrooms);

fetch('/api/predict_home_price', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
  outcome.innerHTML = `<div  class="p-3 mb-2 bg-light text-dark text-center"> ${result.estimated_price.toString()}  Lakhs</div>`

})
.catch(error => {
  console.error('Error:', error);
  outcome.innerHTML = `<div  class="p-3 mb-2 bg-light text-dark text-center"> Please enter valid data </div>`
});
}

