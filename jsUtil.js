/*!
 * jsUtil v0.1.3
 * https://www.tiny-threads.com
 * 2016-03-04
 *
 * Copyright 2016 Steve Koehler
 * Email : steve@tiny-threads.com
 */

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
		
	//merge two objects into one new object
	merge:function(obj1,obj2){
		var final_obj = {};
		for(var prop in obj1){
			final_obj[prop] = obj1[prop];
		}
		for (var prop in obj2){
			if(!final_obj.hasOwnProperty(prop)) //ignore property if it already exists
				final_obj[prop] = obj2[prop];
		}
		return final_obj;
	}
    },
    
    //handle arrays
    arrays:{
        
        //is a value in an array
        in:function(needle,haystack){
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
            return false;
        }
    },
    
    //handle loading files
    load:{
        
        //cache of loaded urls
        loaded:[],
        
        //load a script and store it in the cache
        scripts:function(url){
            if(!jsUtil.arrays.in(url,this.loaded)){
                var script= document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        
        //load a stylesheet and store it in the cache
        styles:function(url,media){
            if(!jsUtil.arrays.in(url,this.loaded)){
                var style= document.createElement("link");
                style.rel = "stylesheet";
                if(media)
                    style.media=media;
                else
                    style.media='screen';
                style.href = url;
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        }
    },
    
    unload:{
        //remove the script tag with the url and remove from the cache
        scripts:function(url){
            var scripts_ar=document.getElementsByTagName('script');
            
            //remove actual script tag from DOM
            for(var i=0;i<scripts_ar.length;i++){
                if(scripts_ar[i].src===url){
                    scripts_ar[i].parentNode.removeChild(scripts_ar[i]);
                }
            }
            
            //remove url instance from the cache
            for(var i=0;i<jsUtil.load.loaded.length;i++){
                if(jsUtil.load.loaded[i].src===url){
                    jsUtil.load.loaded.splice(i,1);
                }
            }
        },
        
        //remove a linked stylesheet and remove from cache
        styles:function(url,media){
            var links=document.getElementsByTagName('link');
            
            //remove actual stylesheet from DOM
            for(var i=0;i<links.length;i++){
                if(links[i].href===url){
                    links[i].parentNode.removeChild(links[i]);
                }
            }
            
            //remove url instance from the cache
            for(var i=0;i<jsUtil.load.loaded.length;i++){
                if(jsUtil.load.loaded[i].src===url){
                    jsUtil.load.loaded.splice(i,1);
                }
            }
        }
    }
}


// load existing stylesheets and scripts into the jsUtil.load cache to allow unload to work
// set on a timeout to allow for page loading
setTimeout(function(){
	var loaded_urls_ar=document.getElementsByTagName('script');
	for(var i=0;i<loaded_urls_ar.length;i++){ //load scripts
		if(loaded_urls_ar[i].src!=='')
			jsUtil.load.loaded.push(loaded_urls_ar[i].src);
	}
	loaded_urls_ar=document.getElementsByTagName('link');
	for(var i=0;i<loaded_urls_ar.length;i++){ //load stylesheets
		if(loaded_urls_ar[i].rel==='stylesheet' && loaded_urls_ar[i].href!==''){
			jsUtil.load.loaded.push(loaded_urls_ar[i].href);
		}
	}
},300);
