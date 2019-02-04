
//The main template of the coins
const currenciesTemplate = `<div class="card col-4" style="width: 18rem;">
    <div class="card-body">
    <div class="row">
      <h5 class="card-title col-6">{{symbol}}</h5>
      <div class="custom-control custom-switch col-6";>
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="checkbox" class="custom-control-input" id="my{{id}}" onchange = toggleChanges()>
      <label class="custom-control-label" for="my{{id}}"></label>
      </div>
    </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">{{name}}</li>
      <a class="btn btn-dark" data-toggle="collapse" href="#{{id}}" role="button" aria-expanded="false" aria-controls="{{id}}")>
      More Info
    </a>
    <div class="collapse" id="{{id}}">
    </div>
    </ul>
  </div>
  <br>`

//Template for additional information
const collapseTemplate = `
  <div class="card" style="width: 18rem;">
  <ul class="list-group list-group-flush">
  <li class="list-group-item"><img src="{{image}}"></li>
    <li class="list-group-item">{{USD}}&nbsp$</li>
    <li class="list-group-item">{{EUR}}&nbsp₪</li>
    <li class="list-group-item">{{ILS}}&nbsp€</li>
  </ul>`


//Template for the modal
const modalTemplate = `
  <div class="container mt-3">
  <!-- The Modal -->
  <div class="modal fade" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">
            Attention!</h4>
          <button type="button" id="closebutton" class="close" data-dismiss="modal">×</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          You can save up to five currencies in the list of reports. If you wish to add this currency, please remove an existing one:
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="modal{{first}}" checked onchange = modalToggleChange()>
            <label class="custom-control-label" for="modal{{first}}">{{first}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="modal{{second}}" checked onchange = modalToggleChange()>
            <label class="custom-control-label" for="modal{{second}}">{{second}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="modal{{third}}" checked onchange = modalToggleChange()>
            <label class="custom-control-label" for="modal{{third}}">{{third}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="modal{{forth}}" checked onchange = modalToggleChange()>
            <label class="custom-control-label" for="modal{{forth}}">{{forth}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="modal{{fifth}}" checked onchange = modalToggleChange()>
            <label class="custom-control-label" for="modal{{fifth}}">{{fifth}}</label>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" id="savebutton" class="btn btn-dark" data-dismiss="modal">Save</button>
        </div>
        
      </div>
    </div>
  </div>
  
</div>
  
  `
  //The template for the search
const searchTemplate = `<div class="card col-4" style="width: 18rem;">
<div class="card-body">
<div class="row">
  <h5 class="card-title col-6">{{symbol}}</h5>
  <div class="custom-control custom-switch col-6";>
  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <input type="checkbox" class="custom-control-input" id="search{{id}}" onchange = searchChanges()>
  <label class="custom-control-label" for="search{{id}}"></label>
  </div>
</div>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">{{name}}</li>
  <a class="btn btn-dark" data-toggle="collapse" href="#search{{id}}" role="button" aria-expanded="false" aria-controls="search{{id}}">
  More Info
</a>
<div class="collapse" id="search{{id}}">
</div>
</ul>
</div>
<br>`

//With page loading, information about the coins coming from API will be displayed.
move()
$.ajax('https://api.coingecko.com/api/v3/coins/list').done(function (d) {
  console.log(d);
  for (i = 100; i < 200; i++) {
    let t = currenciesTemplate;
    t = t.replace('{{symbol}}', d[i].symbol);
    t = t.replace('{{name}}', d[i].name);
    t = t.replace(/{{id}}/g, d[i].id);
    $('#content').append(t);

  }
  collapseEvent();
});


//By clicking the button, additional information about the currency will be opened
function collapseEvent() {
  $('.collapse').on('show.bs.collapse', function () {
    $.ajax('https://api.coingecko.com/api/v3/coins/' + this.id).done((d) => {
      move()
      console.log(d);
      let t = collapseTemplate;
      t = t.replace('{{image}}', d.image.thumb);
      t = t.replace('{{USD}}', d.market_data.current_price.usd);
      t = t.replace('{{EUR}}', d.market_data.current_price.eur);
      t = t.replace('{{ILS}}', d.market_data.current_price.ils);
      $('#' + this.id).html(t);

    });
  })
}
// var search;
// function searchCollapseEvent() {
//   $('.collapse').on('show.bs.collapse', function () {
//     console.log(search)
//     $.ajax('https://api.coingecko.com/api/v3/coins/' + search).done( function (d) {
//       // move()
//       console.log(d);
//       console.log(search)
//       let t = collapseTemplate;
//       t = t.replace('{{image}}', d.image.thumb);
//       t = t.replace('{{USD}}', d.market_data.current_price.usd);
//       t = t.replace('{{EUR}}', d.market_data.current_price.eur);
//       t = t.replace('{{ILS}}', d.market_data.current_price.ils);
//       console.log(search);
//       $('#search' + search).html(t);

//     });
//   })
// }

//The function that activates the progress bar
function move() {
  var elem = document.getElementById("myBar");
  var width = 10;
  var id = setInterval(frame, 5);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      $('.myProgress').css('visibility', 'hidden')
    } else {
      $('.myProgress').css('visibility', 'visible')
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1 + '%';
    }
  }
}

//When the Search button is pressed, the display will be empty and the search function will be activated
$("#searchbutton").click(function () {
  $('#content').empty();
  searchBySymbol()
})


//The function runs on the currency list and finds where the symbol is equal to the information received in the input
var search;
var input=$("#searchinput").val();
function searchBySymbol() {
  $.ajax('https://api.coingecko.com/api/v3/coins/list').done(function (d) {
    for (let i = 100; i < 200; i++) {
      if (d[i].symbol == $("#searchinput").val()) {
        search = d[i].id;
      }
    }
    buildBySearch();
  })
}

//The function builds the relevant card display
function buildBySearch() {
  move()
  $.ajax('https://api.coingecko.com/api/v3/coins/' + search).done(function (d) {
    console.log(d);
    let t = searchTemplate;
    t = t.replace('{{symbol}}', d.symbol);
    t = t.replace('{{name}}', d.name);
    t = t.replace(/{{id}}/g, d.id);
    $('#content').html(t);
  });
  collapseEvent();
}



//This array contains all the "id" of the currencies
var idArray = [];
$.ajax('https://api.coingecko.com/api/v3/coins/list').done(function (d) {
  for (i = 100; i < 200; i++) {
    idArray.push(d[i].id);
  }
});


//If the user wants to add a sixth currency to the list of reports, the function that deals with the modal will be called
var currenciesReport = [];
var tempArray;
var theSixth;
function toggleChanges() {
  let counter = 0;
  tempArray = []
  for (let i = 0; i < idArray.length; i++) {
    if ($("#my" + idArray[i]).prop("checked") == true) {
      counter++
      tempArray.push(idArray[i]);
    }
  }
  if (counter <= 5) {
    currenciesReport = tempArray;
    setReportsToLocalStorage(currenciesReport);
  }
  if (counter > 5) {
    findTheSixth();
    appendModalTemplate();
  }
}

//This function is responsible for changes in the toggle button of the search result card
var sixth;
function searchChanges(){
  if ((localStorage.getItem("report") != null)) {
    reports = getReportsFromLocalStorage();
  }
  console.log(reports);
  if(reports.length==5){
    sixth=search;
    appendModalTemplate();
  }
  else{
    currenciesReport.push(search);
    setReportsToLocalStorage(currenciesReport)
  }
}


//After comparing the array with five coins marked and the array with 6 coins marked. We find the last currency that has been marked. 
function findTheSixth() {
  for (let i = 0; i < tempArray.length; i++) {
    let check = false;
    for (let j = 0; j < currenciesReport.length; j++) {
      if (currenciesReport[j] == tempArray[i]) {
        check = true;
      }
    }
    if (check == false) {
      theSixth = tempArray[i];
    }
  }
}


//The values ​​in the modal change accordingly and the modal is displayed
function appendModalTemplate() {
  let t = modalTemplate;
  let r = currenciesReport;
  t = t.replace(/{{first}}/g, r[0]);
  t = t.replace(/{{second}}/g, r[1]);
  t = t.replace(/{{third}}/g, r[2]);
  t = t.replace(/{{forth}}/g, r[3]);
  t = t.replace(/{{fifth}}/g, r[4]);
  $('#modal').html(t);
  $("#myModal").modal();
  cancelSwitching()
}

//The function checks whether a currency has been removed from the list. And if this is the case, the sixth coin marked on the spot will be inserted
function modalToggleChange() {
      $("#savebutton").click(function () {
        for (let i = 0; i < currenciesReport.length; i++) {
          if ($("#modal" + currenciesReport[i]).prop("checked") == false) {
            var removeItem = currenciesReport[i];
        $("#my" + currenciesReport[i]).prop("checked", false);
        $("#my" + theSixth).prop("checked", true);
        currenciesReport = jQuery.grep(currenciesReport, function (value) {
          return value != removeItem; 
        });
        if(theSixth!=undefined){
        currenciesReport.push(theSixth);
        }
        else{
        currenciesReport.push(sixth);
        }
        console.log(currenciesReport)
      }
  }
  for(let i=currenciesReport.length; i>0; i--){
    if(currenciesReport[i]==currenciesReport[i-1]){
currenciesReport.pop(currenciesReport[i]);
  setReportsToLocalStorage(currenciesReport);
    }
  }
})
}




//By pressing the Cancel button or the Save button without changing. The sixth currency will not be placed in the list of reports
function cancelSwitching() {
  $(".close").click(function () {
    let flag = true;
    for (let i = 0; i < currenciesReport.length; i++) {
      if ($("#my" + currenciesReport[i]).prop("checked") == false) {
        flag = false;
      }
    }
    if (flag == true) {
      $("#my" + theSixth).prop("checked", false);
    }
  })
  $("#savebutton").click(function () {
    let flag = true;
    for (let i = 0; i < currenciesReport.length; i++) {
      if ($("#my" + currenciesReport[i]).prop("checked") == false) {
        flag = false;
      }
    }
    if (flag == true) {
      $("#my" + theSixth).prop("checked", false);
    }
  })
  setReportsToLocalStorage(currenciesReport);
}

var reports = [];

//The function stores localstorage in the updated list of reports and overwrites the previous one
function setReportsToLocalStorage(currenciesReport) {
  report = JSON.stringify(currenciesReport);
  localStorage.setItem("report", report);
}

//This function gets data from local storage
function getReportsFromLocalStorage() {
  let getMe = localStorage.getItem("report");
  return JSON.parse(getMe);
}





