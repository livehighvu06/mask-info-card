var selectCity = document.querySelector('.select-city');
var selectArea = document.querySelector('.select-area');

var county=[]; //儲存縣市的名稱
var zone=[]; //儲存分區的名稱
var city; //儲存所選取的縣市名稱 

var rts='';
rts += '<option>-- 請選擇所在城市 --</option>';
var area='';
area +='<option>-- 請選擇所在區域 --</option>';

var request = new XMLHttpRequest();
request.open(
'get',
'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
,true);
request.send(null);
request.onload = function(){
    var pharmacyInfo = JSON.parse(request.responseText);
   
    console.log(pharmacyInfo);
    for(var i = 0;i < pharmacyInfo.features.length; i++){
        if(county.indexOf(pharmacyInfo.features[i].properties.county)==-1 && pharmacyInfo.features[i].properties.county!=''){
            county.push(pharmacyInfo.features[i].properties.county);
            rts += '<option>'+pharmacyInfo.features[i].properties.county+'</option>';
        }
        selectCity.innerHTML = rts;
    }
    
    function showArea(e){
        city = e.target.value;
        for(var i = 0;i < pharmacyInfo.features.length; i++){  
            if(zone.indexOf(pharmacyInfo.features[i].properties.town)==-1 && city == pharmacyInfo.features[i].properties.county){
                zone.push(pharmacyInfo.features[i].properties.town);
                console.log(zone);
                area += '<option>'+pharmacyInfo.features[i].properties.town+'</option>';
            }
            selectArea.innerHTML = area;
        }
        zone =[];
        area = '';
        area +='<option>-- 請選擇所在區域 --</option>';
    }
    function createCard(e){
        var location = e.target.value;
        console.log(location);
        console.log(city+location)
        var ctc = '';
        if (location == '--請選擇行政區--') {return;}
        for (var i = 0; i < pharmacyInfo.features.length; i++) {
          if (pharmacyInfo.features[i].properties.town == location&&pharmacyInfo.features[i].properties.county==city) {
            ctc +='<div class="card">';
            ctc +='<div class="pharmacy-header">';
            ctc +='<div class="pharmacy-name">';
            ctc +='<h2>'+pharmacyInfo.features[i].properties.name+'</h2>';
            ctc +='</div>';
            ctc +='<div class="mask-info">';
            ctc +='<div class="adultMask">'+'<p class="maskTitle">成人口罩</p>'+'<span class="maskCount">'+pharmacyInfo.features[i].properties.mask_adult+'</div>';
            ctc +='<div class="childMask">'+'<p class="maskTitle">兒童口罩</p>'+'<span class="maskCount">'+pharmacyInfo.features[i].properties.mask_child+'</div>';
            ctc +='</div>';
            ctc +='</div>';
            ctc +='<div class="pharmacy-contact">';
            ctc +='<p>'+pharmacyInfo.features[i].properties.address+'</p>';
            ctc +='<p>'+pharmacyInfo.features[i].properties.phone+'</p>';
            ctc +='</div>';
            ctc +='</div>';
          }
        }
        document.querySelector('.card-group').innerHTML = ctc;
    }
    selectCity.addEventListener('change',showArea);
    selectArea.addEventListener('change',createCard);
}




