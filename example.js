
const currenciesTemplate = `<div class="card col-4" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">{{symbol}}</h5>
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


const y = `<img src="{{image}}">
<ul class="list-group list-group-flush">
<li class="list-group-item">{{USD}}</li>
<li class="list-group-item">{{EUR}}</li>
<li class="list-group-item">{{ILS}}</li>
</ul>`;

$.ajax('https://api.coingecko.com/api/v3/coins/list').done(function (d) {
console.log(d);
for(i=0; i<99; i++ ){
    let t = currenciesTemplate;
    t = t.replace('{{symbol}}', d[i].symbol);
    t = t.replace('{{name}}', d[i].name);
    t = t.replace(/{{id}}/g, d[i].id);
    $('#content').append(t); 
    
}
collapseEvent();
});



function collapseEvent() {
$('.collapse').on('show.bs.collapse', function () {

$.ajax('https://api.coingecko.com/api/v3/coins/'+this.id).done( (d) => {
    console.log(d);
        let t = y;
         t = t.replace('{{image}}', d.image.thumb);
        t = t.replace('{{USD}}', d.market_data.current_price.usd);
        t = t.replace('{{EUR}}', d.market_data.current_price.eur);
        t = t.replace('{{ILS}}', d.market_data.current_price.ils);
        $('#'+this.id).html(t); 
    
    });
})
}
