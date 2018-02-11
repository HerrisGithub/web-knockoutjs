
function getListDay(){
    var day=[];
    for(var i=1; i<=31; i++){
        day.push({day:i});
    }
    return day;
}
function getListMonth(){
    var month = [
        {id:1,month:'Jan'},
        {id:2,month:'Feb'},
        {id:3,month:'Mar'},
        {id:4,month:'Apr'},
        {id:5,month:'Mei'},
        {id:6,month:'Jun'},
        {id:7,month:'Jul'},
        {id:8,month:'Agu'},
        {id:9,month:'Sep'},
        {id:10,month:'Okt'},
        {id:11,month:'Nov'},
        {id:12,month:'Des'},
    ];
    return month;
}
function getListYear(){
    var year = [];
    var date = new Date();
    for(var i =date.getFullYear(); i>=1905; i--){
        year.push({year:i});
    }
    return year;
}