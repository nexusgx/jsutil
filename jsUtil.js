/*!
 * jsUtil v0.1.4
 * https://www.tiny-threads.com
 * 2016-05-10
 *
 * Copyright 2016 Steve Koehler
 * Email : steve@tiny-threads.com
 */

if(!jsUtil)
var jsUtil={
    debug:false,
    log_history:[],
    log:function(item){
        var output=(new Error).lineNumber,err={};
        if(typeof output==='undefined'){
            function getErrorObject(){
                try { throw Error(''); } catch(err) { return err; }
            }
            err = getErrorObject();
            output = err.stack.split("\n")[4].slice(err.stack.split("\n")[4].indexOf("at ")+2, err.stack.split("\n")[4].length);
        }
        jsUtil.log_history.push({item:item,output:output});
        if(jsUtil.debug){
            console.log(item,'::',output);
            //console.log('-------------------------------------------------');
        }
    },
    bool:{
        //toggle between two values; defaults to true and false;
        toggle: function(value,opt1,opt2){
            
            //both opt1 and opt2 must be defined to use custom values
            if(typeof opt1!=='undefined' && typeof opt2!=='undefined'){
                if(value===opt1) 
                    return opt2;
                else 
                    return opt1;
            }
            else{
                if(value)
                    return false;
                else
                    return true;
            }
            
        }
    },
    number:{
        // ensures a number is %, px, or em
        get_measurement:function(val){
            if(typeof val==='number')
                return val.toString()+'%';
            else
                return parseFloat(val)+(val.match(/(%|px|em)$/)||["%"])[0];
        },
        //get the percentage 
        get_percent: function(num,total){
            return (100*(parseInt(num)/parseFloat(total))).toFixed(2);
        },
        //get number from a measurement
        get_number: function(num){
            var type='';
            
            //if it's already a number
            if(typeof val==='number') return num;
            
            type=(val.match(/(%|px|em)$/)||["%"]);
            return parseFloat(num.replace(type,''));
        },
        //pad a number string with a specified character (defaults to 0)
        pad: function(str,pad,pad_char){
            if (typeof str === 'undefined') 
                return pad;
            if(typeof pad_char==='undefined')
                pad_char='0';
            for(var i=0;i<pad;i++)
                str=pad_char+''+str;
            return str.slice(-pad);
        }
    },
    
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
    	
    	//return the number of properties and methods in an object
    	length:function(obj){
    		return Object.keys(obj).length;
    	},
        
        // get an array of the object's properties
        get_properties:function(obj){
            var keys=[];
            if(typeof obj !== 'object') return null;
            for(var key in obj){
                if(obj.hasOwnProperty(key))
                    keys.push(key);
            }
            return keys;
        },
		
		//merge two objects into one new object
		merge:function(obj1,obj2){
			var final_obj = {};
			for(var prop in obj1){
				final_obj[prop] = obj1[prop];
			}
			for (prop in obj2){
				if(!final_obj.hasOwnProperty(prop)) //ignore property if it already exists
					final_obj[prop] = obj2[prop];
			}
			return final_obj;
		},
		
		//copied almost directly from https://davidwalsh.name/javascript-clone
		clone:function (obj,type){
			if(typeof type ==='undefined')
				type='shallow';
			if(type==='deep'){
				function mixin(dest, source, copyFunc) {
					var name, s, i, empty = {};
					for(name in source){
						// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
						// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
						// don't overwrite it with the toString() method that source inherited from Object.prototype
						s = source[name];
						if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
							dest[name] = copyFunc ? copyFunc(s) : s;
						}
					}
					return dest;
				}

				if(!obj || typeof obj !== "object" || Object.prototype.toString.call(obj) === "[object Function]"){
					// null, undefined, any non-object, or function
					return obj;	// anything
				}
				if(obj.nodeType && "cloneNode" in obj){
					// DOM Node
					return obj.cloneNode(true); // Node
				}
				if(obj instanceof Date){
					// Date
					return new Date(obj.getTime());	// Date
				}
				if(obj instanceof RegExp){
					// RegExp
					return new RegExp(obj);   // RegExp
				}
				var r, i, l;
				if(obj instanceof Array){
					// array
					r = [];
					for(i = 0, l = obj.length; i < l; ++i){
						if(i in obj){
							r.push(jsUtil.objects.clone(obj[i]));
						}
					}
					// we don't clone functions for performance reasons
					//		}else if(d.isFunction(obj)){
					//			// function
					//			r = function(){ return obj.apply(this, arguments); };
				}
				else{
					// generic objects
					r = obj.constructor ? new obj.constructor() : {};
				}
				return mixin(r, obj, clone);
			}
			else if(type==='shallow'){
				return JSON.parse(JSON.stringify(obj));
			}
		}
    },
    
    //handle arrays
    arrays:{
        
        //is a value in an array
        in:function(needle,haystack){
            for (var key in haystack) {
                if (haystack[key] === needle) {
                    return true;
                }
            }
            return false;
        },
        
        //sort an array of objects by a common property in each object
        sort_by_obj_prop:function(arr,prop,dir) {
            if(typeof dir==='undefined')
                dir='asc';
                
            arr.sort(function(a,b){
                if ((a[prop] < b[prop] && dir==='asc') || (a[prop] > b[prop] && dir==='desc'))
                    return -1;
                if ((a[prop] > b[prop] && dir==='asc') || (a[prop] < b[prop] && dir==='desc'))
                    return 1;
                return 0;
            });

            return arr;
        }
    },
    
    //handle loading files
    load:{
        
        //cache of loaded urls
        loaded:[],
        
        //load a script and store it in the cache
        scripts:function(url,after){
            if(!jsUtil.arrays.in(url,jsUtil.load.loaded)){
                var script= document.createElement("script");
                script.type = "text/javascript";
                document.getElementsByTagName('head')[0].appendChild(script);
                if(typeof after==='function')
                    script.onload=after;
                script.src = url;
                jsUtil.load.loaded.push(script);
            }
        },
        
        //load a stylesheet and store it in the cache
        styles:function(url,media,after){
            if(!jsUtil.arrays.in(url,jsUtil.load.loaded)){
                var style= document.createElement("link");
                style.rel = "stylesheet";
                if(media)
                    style.media=media;
                else
                    style.media='screen';
                document.getElementsByTagName('head')[0].appendChild(style);
                if(typeof after==='function')
                    script.onload=after;
                style.href = url;
                jsUtil.load.loaded.push(style);
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
            for(i=0;i<jsUtil.load.loaded.length;i++){
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
            for(i=0;i<jsUtil.load.loaded.length;i++){
                if(jsUtil.load.loaded[i].src===url){
                    jsUtil.load.loaded.splice(i,1);
                }
            }
        }
    },
    elements:{
        //removing by id
        remove_by_id:function(id){
            var ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
        },
        remove_by_classname:function(classname){
            var eles = document.getElementsByClassName(classname);
            /*
            * have to use while loop because eles is a live list and not an array
            * live lists have to be removed backwards due to their constantly
            * updating nature
            */
            while(eles[0]){
                eles[0].parentNode.removeChild(eles[0]);
            }
            
        },
        
        //run code for each matching element found
        each:function(selector,code_to_run){
            var items=[];
            if(typeof code_to_run==='function'){
                //query the string unless it's already an array of elements

                if(typeof selector==='string')
                    items=document.querySelectorAll(selector);
                else if(typeof selector==='object')
                    items=selector;
                    
                for(var i=0;i<items.length;i++){
                    code_to_run(items[i]);
                }
            }
        }
    },
	events:{
		// trigger an event
		fire:function (obj, e){
			var evt = {};
			if( document.createEvent ) {
				evt = document.createEvent("HTMLEvents");
				evt.initEvent(e, false, true);
				obj.dispatchEvent( evt );
			}
			else if( document.createEventObject ) { //IE
				obj.fireEvent( 'on' + e );
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
			jsUtil.load.loaded.push(loaded_urls_ar[i]);
	}
	loaded_urls_ar=document.getElementsByTagName('link');
	for(i=0;i<loaded_urls_ar.length;i++){ //load stylesheets
		if(loaded_urls_ar[i].rel==='stylesheet' && loaded_urls_ar[i].href!==''){
			jsUtil.load.loaded.push(loaded_urls_ar[i]);
		}
	}
},300);
