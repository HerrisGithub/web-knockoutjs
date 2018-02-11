var viewModel = function(){
    var self = this;
    self.enableButton = ko.observable(true);
    self.optionsDay=ko.observableArray(getListDay());
    self.optionsMonth=ko.observableArray(getListMonth());
    self.optionsYear=ko.observableArray(getListYear());
    self.date = ko.observable();
    self.month = ko.observable();
    self.year = ko.observable();
    self.username = ko.observable();
    self.password = ko.observable();

    self.dateException = ko.observable();

    self.isValidDate= function (year,month,date) {
        var newdate = new Date();
        var yyyy = Number(year);
        var mm = Number(month)-1;
        var dd = Number(date);
        newdate.setFullYear(yyyy);
        newdate.setMonth(mm);
        newdate.setDate(dd);
        return dd == newdate.getDate() && mm == newdate.getMonth() && yyyy == newdate.getFullYear();
    }
    self.enableSubmit=function(){
        var isvalid = self.isValidDate(self.year(),self.month(),self.date());
        self.enableButton(isvalid);
        if(isvalid){
            self.dateException('');
        }else{
            self.dateException('Tanggal Tidak Valid');
        }
    }
    self.changeDate = function(){
       self.enableSubmit();
    }
    self.changeMonth = function(){
        self.enableSubmit();
    }
    self.changeYear = function(){
        self.enableSubmit();
    }
    
    


    // self.login = ko.computed({
    //     read:function(){},
    //     write:function(){
    //         $.post('/login',{username:'herris'})
    //         .done(function(){
    //             alert(123);
    //         });
    //     }
    // })
}
ko.applyBindings(new viewModel(),document.getElementById('loginContent')); 