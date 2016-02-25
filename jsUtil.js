if(!jsUtil)
var jsUtil={
    //specific to Storage objects
    store:{
        storage:localStorage,
        // convert val to JSON and add to the Storage object
        set:function(name,val){
            this['jsu_'+name]=val; // keep within jsUtil to bypass future JSON conversion
            storage.setItem('jsu_'+name,JSON.stringify(val));
            return this;
        },
        
        //retrieve the property from the Storage object
        get:function(name){
            var ret;
            if(typeof this['jsu_'+name] === 'undefined'){ // look for a jsUtil copy to bypass JSON conversion
                if(this.exists(name)){
                    ret=JSON.parse(storage.getItem('jsu_'+name));
                }
                else{
                    ret=null;
                }
            }
            else{
                ret=this['jsu_'+name];
            }
            return ret;
        },
        
        //delete the property from the Storage object and jsUtil
        delete:function(name){
            delete this['jsu_'+name];
            return delete storage['jsu_'+name];
        },
        
        //does the property exist in the Storage object; ignores the local properties
        exists:function(name){
            if(typeof storage['jsu_'+name]==='undefined'){
                return false;
            }
            else{
                return true;
            }
        }
    }
}
