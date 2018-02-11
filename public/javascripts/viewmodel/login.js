var viewModel = function(){
    var self = this;
    self.username = ko.observable();
    self.password = ko.observable();
    self.login = ko.computed({
        read:function(){},
        write:function(){
            $.post('/login',{username:'herris'})
            .done(function(){
                alert(123);
            });
        }
    })
}
ko.applyBindings(new viewModel(),document.getElementById('loginContent')); 