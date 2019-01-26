//The main template of the coins
const currenciesTemplate = `<div class="card col-4" style="width: 18rem;">
    <div class="card-body">
    <div class="row">
      <h5 class="card-title col-6">{{symbol}}</h5>
      <div class="custom-control custom-switch col-6">
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="checkbox" class="custom-control-input" id="my{{id}}" onchange = toggleChanges()>
      <label class="custom-control-label" for="my{{id}}"></label>
      </div>
    </div>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">{{name}}</li>
      <a class="btn btn-primary" data-toggle="collapse" href="#{{id}}" role="button" aria-expanded="false" aria-controls="{{id}}")>
      More Info
    </a>
    <div class="collapse" id="{{id}}">

    </div>
    </ul>
  </div>
  <br>`

//Template for additional information
const collapseTemplate = `<img src="{{image}}">
  <ul class="list-group list-group-flush">
  <li class="list-group-item">{{USD}}&nbsp$</li>
  <li class="list-group-item">{{EUR}}&nbsp₪</li>
  <li class="list-group-item">{{ILS}}&nbsp€</li>
  </ul>`;


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
          <button type="button" class="close" data-dismiss="modal">×</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          You can save up to five currencies in the list of reports. If you wish to add this currency, please remove an existing one:
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="{{first}}" checked onchange = >
            <label class="custom-control-label" for="{{first}}">{{first}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="{{second}}" checked onchange = >
            <label class="custom-control-label" for="{{second}}">{{second}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="{{third}}" checked onchange = >
            <label class="custom-control-label" for="{{third}}">{{third}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="{{forth}}" checked onchange = >
            <label class="custom-control-label" for="{{forth}}">{{forth}}</label>
          </div>
          <div class="custom-control custom-switch col-6">
            <input type="checkbox" class="custom-control-input" id="{{fifth}}" checked onchange = >
            <label class="custom-control-label" for="{{fifth}}">{{fifth}}</label>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
  
</div>
  
  `


//With page loading, information about the coins coming from API will be displayed.
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

//This array contains all the "id" of the currencies
var idArray = [];
$.ajax('https://api.coingecko.com/api/v3/coins/list').done(function (d) {
  for (i = 100; i < 200; i++) {
    idArray.push(d[i].id);
  }
});


//If the user wants to add a sixth currency to the list of reports, the function that deals with the model will be called
var reportedCurrenciesArray;
var counter;
var tempArray;

function toggleChanges() {
  counter = 0;
  reportedCurrenciesArray = [];
  for (let i = 0; i < idArray.length; i++) {
    if ($("#my" + idArray[i]).prop("checked") == true) {
      counter++
      reportedCurrenciesArray.push(idArray[i]);
      }
    }
  if (counter > 5) {
  console.log(reportedCurrenciesArray);
  // $('#myairbloc-protocol').attr('disabled', true);
  appendModalTemplate();
  
  }
  if(counter==5){
    tempArray=reportedCurrenciesArray;
  }
 
 
}
// $('#myairbloc-protocol').removeAttr('disabled');




//The values ​​in the model change accordingly and the modal is displayed
function appendModalTemplate() {
  let t = modalTemplate;
  let r = tempArray;
  t = t.replace(/{{first}}/g, r[0]);
  t = t.replace(/{{second}}/g, r[1]);
  t = t.replace(/{{third}}/g, r[2]);
  t = t.replace(/{{forth}}/g, r[3]);
  t = t.replace(/{{fifth}}/g, r[4]);
  $('#modal').html(t);
  $("#myModal").modal();

}



