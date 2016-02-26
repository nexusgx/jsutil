if(!jsUtil)
var jsUtil={
    //specific to Storage objects
    store:{
        storage:localStorage,
        // convert val to JSON and add to the Storage object
        set:function(name,val){
            this.setup_vars();
            this.vars['jsu_'+name]=val; // keep within jsUtil to bypass future JSON conversion
            this.storage.setItem('jsu_'+name,JSON.stringify(val));
            return this;
        },
        
        //retrieve the property from the Storage object
        get:function(name){
            var ret;
            this.setup_vars();
            if(typeof this.vars['jsu_'+name] === 'undefined'){ // look for a jsUtil copy to bypass JSON conversion
                if(this.exists(name)){
                    ret=JSON.parse(this.storage.getItem('jsu_'+name));
                }
                else{
                    ret=null;
                }
            }
            else{
                ret=this.vars['jsu_'+name];
            }
            return ret;
        },
        
        //delete the property from the Storage object and jsUtil
        delete:function(name){
            this.setup_vars();
            delete this.vars['jsu_'+name];
            return delete this.storage['jsu_'+name];
        },
        
        //does the property exist in the Storage object; ignores the local properties
        exists:function(name){
            this.setup_vars();
            if(typeof this.storage['jsu_'+name]==='undefined'){
                return false;
            }
            else{
                return true;
            }
        },
        
        //completely empty all stored variables set by jsUtil
        purge:function(){
            var vars=jsUtil.objects.get_properties(this.storage);
            for(var i=0;i<vars.length;i++){ // loop through and find jsUtil properties
                if(vars[i].startsWith('jsu_')){
                    delete localStorage[vars[i]];
                }
            }
            this.vars.length=0;
        },
        
        // make sure the store.vars property is set to prevent unnecessary errors
        setup_vars:function(){
            if(typeof this.vars === 'undefined')this.vars={};
        }
    },
    
    // handle objects
    objects:{
        
        // get an array of the object's properties
        get_properties:function(obj){
            var keys=[];
            if(typeof obj !== 'object') return null;
            for(var key in obj){
                if(obj.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        }
    }
}
