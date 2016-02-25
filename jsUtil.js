if(!jsUtil)
var jsUtil={
    //specific to localStorage
    local:{
        
        // convert val to JSON and add to local storage
        set:function(name,val){
            this['jsu_'+name]=val; // keep within jsUtil to bypass future JSON conversion
            localStorage.setItem('jsu_'+name,JSON.stringify(val));
            return this;
        },
        
        //retrieve the property from local storage
        get:function(name){
            var ret;
            if(typeof this['jsu_'+name] === 'undefined') // look for a jsUtil copy to bypass JSON conversion
                if(typeof localStorage.getItem('jsu_'+name)==='undefined')
                    ret=null;
                else
                    ret=JSON.parse(localStorage.getItem('jsu_'+name));
            else
                ret=this['jsu_'+name];
            return ret;
        },
        
        //delete the property from local storage and jsUtil
        delete:function(name){
            delete this['jsu_'+name];
            return delete localStorage['jsu_'+name];
        },
        
        //does the property exist in localStorage
        exists:function(name){
            if(typeof localStorage['jsu_'+name]==='undefined')
                return false;
            else
                return true;
        }
    }
}
