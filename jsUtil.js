if(!jsUtil)
var jsUtil={
    //specific to localStorage
    local:{
        set:function(name,val){
            return localStorage.setItem(name,JSON.stringify(val));
        },
        get:function(name){
            return JSON.parse(localStorage.getItem(name));
        },
        delete:function(name){
            return delete localStorage[name];
        }
    }
}
