
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
    <div class="collapse coin" id="{{id}}">
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
          <h4 class="modal-title">Attention!</h4>
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
  <a class="btn btn-dark" data-toggle="collapse" href="#input{{id}}" role="button" aria-expanded="false" aria-controls="input{{id}}">
  More Info
</a>
<div class="collapse coin" id="input{{id}}">
</div>
</ul>
</div>
<br>`

//variables
var generalReports;
var search;
var currenciesReport = [];
var tempArray;
var theSixth;
var sixth;
var reports = [];

jQuery(document).ready(() => {
  collapseEvent();
});

window.cacheObj = window.cacheObj || {};


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
    checkChosenCurrencies(d)
  }
});

//The function accepts reports from localStorage and checks the relevant currencies
function checkChosenCurrencies(d) {
  if ((localStorage.getItem("report") != null)) {
    generalReports = getReportsFromLocalStorage();
    console.log(generalReports)
    for (let j = 0; j < generalReports.length; j++) {
      if (d[i].id == generalReports[j]) {
        $("#my" + d[i].id).prop("checked", true)
      }
    }
  }
}

//By clicking the "more info" button, the "whereTakeTheDadaFrom" will be activated
function collapseEvent() {
  $(document).on('show.bs.collapse', '.collapse.coin', function () {
    whereToTakeTheDadaFrom(this.id)
  })
}

//If no more than two minutes have elapsed before the next click, the information will come from the cash
function whereToTakeTheDadaFrom(coinId) {
  if (window.cacheObj.projects != undefined) {
    k = window.cacheObj.projects;
    if (coinId == k.id) {
      const lastTime = window.cacheObj.lastFetch;
      if (lastTime) {
        const dateNow = new Date();
        const diff = (dateNow.getTime() - lastTime.getTime()) / 1000;
        if (diff > 20) {
          getFromServer(coinId);
        } else {
          getFromCache(coinId);
        }
      }
    } else {
      getFromServer(coinId);
    }
  }
  else {
    getFromServer(coinId);
  }
}

//Sending an API call, And save time and currency data
function getFromServer(coinId) {
  $.ajax('https://api.coingecko.com/api/v3/coins/' + coinId.replace('input', '')).done((d) => {
    window.cacheObj.projects = d;
    window.cacheObj.lastFetch = new Date();
    move()
    moreInfo(d, coinId)
  });
}

//Accepted data from cache
function getFromCache(coinId) {
  move()
  moreInfo(window.cacheObj.projects, coinId);
}

//Display the additional information
function moreInfo(d, coinId) {
  let t = collapseTemplate;
  t = t.replace('{{image}}', d.image.thumb);
  t = t.replace('{{USD}}', d.market_data.current_price.usd);
  t = t.replace('{{EUR}}', d.market_data.current_price.eur);
  t = t.replace('{{ILS}}', d.market_data.current_price.ils);
  $('#' + coinId).html(t);
}


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

//When the Search button is pressed, the display screen will be empty and the search function will be activated
$("#searchbutton").click(function () {
  $('#content').empty();
  searchBySymbol()
})


//The function runs on the currency list and finds where the symbol is equal to the information received in the input
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

//The function builds the relevant card display using the symbol
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


function toggleChanges() {
  let counter = 0;
  tempArray = []
  //In any case of change in the toggle button, the loop runs on the idArray and each marked currency enters the tempArray
  for (let i = 0; i < idArray.length; i++) {
    if ($("#my" + idArray[i]).prop("checked") == true) {
      counter++
      tempArray.push(idArray[i]);
    }
  }
  //In any case where the number of coins is less than or equal to five, the coins will be kept in currenciesReport and localStorage
  if (counter <= 5) {
    currenciesReport = tempArray;
    setReportsToLocalStorage(currenciesReport);
  }
  //If the user wants to add a sixth currency to the list of reports, the functions that deals with the modal will be called
  if (counter > 5) {
    if (currenciesReport.length == 0) {
      currenciesReport = getReportsFromLocalStorage()
    }
    findTheSixth();
    appendModalTemplate();
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


//The values ​​in the modal change accordingly, and the modal is displayed
function appendModalTemplate() {
  let t = modalTemplate;
  r = currenciesReport;
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
        if (theSixth != undefined) {
          currenciesReport.push(theSixth);
        }
        else {
          currenciesReport.push(sixth);
        }
      }
    }
    for (let i = currenciesReport.length; i > 0; i--) {
      if (currenciesReport[i] == currenciesReport[i - 1]) {
        currenciesReport.pop(currenciesReport[i]);
      }
    }
    setReportsToLocalStorage(currenciesReport);
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

//This function is responsible for changes in the toggle button of the search result card
function searchChanges() {
  if ((localStorage.getItem("report") != null)) {
    currenciesReport = getReportsFromLocalStorage();
  }
  if (currenciesReport.length == 5) {
    sixth = search;
    appendModalTemplate();
  }
  else {
    currenciesReport.push(search);
    setReportsToLocalStorage(currenciesReport)
  }
}

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


