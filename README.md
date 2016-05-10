# jsUtil

This is just a simple utility object that I use in my work from time to time. I may add things from time to time, but it's never really a finished project. 


# Documentation
##jsUtil object

###number
| method | arguments | description |
| --- | --- | --- |
| get_measurement | *mixed* val| Forces val to have a measurement of either %, px, or em. Defaults to % if no matching measurement is present |
| get_percent | *mixed* num, *mixed* total | returns the percentage to the nearest hunderedth |
| get_number | *string* name | gets the number from a measurement of %, em, or px |
| pad | *string* str, *string* pad, *string* pad_char | pads a string up to character number pad with pad_char. pad_char defaults to 0 |

###bool
| method | arguments | description |
| --- | --- | --- |
| toggle | *mixed* val, *mixed* opt1, *mixed* opt2| toggles val between either true and false, or two custom values (opt1 and opt2). Both opt1 and opt2 must be defined in order to use the custom values |

####store

| property |type| description |
| --- | --- | --- |
| storage |Storage object| the Storage object to be used. Defaults to localStorage |

| method | arguments | description |
| --- | --- | --- |
| set | *string* name, *mixed* val| converts value to JSON and utilizes Storage.setItem to save the value locally  |
| get | *string* name | retrieves the value using Storage.getItem and parses the JSON |
| delete | *string* name | deletes the item from the Storage object completely |
| exists | *string* name | detects if the property already exists within the Storage object |
| purge |  | deletes all variables from the storage object that had been set by jsUtil |

####objects

| method | arguments | description |
| --- | --- | --- |
| get_properties | *object* obj| runs through the object and finds all it's properties |
| merge | *object* obj1, *object* obj2 | merges two objects into one new object. Properties of the second object will not be merged if the first object shares the same property name. The first object takes precedence.|
| clone| *object* obj, *string* type | clone the source object. set type to deep for a deep copy. type defaults to 'shallow' |

####arrays

| method | arguments | description |
| --- | --- | --- |
| in | *mixed* needle, *array* haystack | determines if the value exists in the array |

####load

| property |type| description |
| --- | --- | --- |
| loaded | array | array of all loaded file urls |

| method | arguments | description |
| --- | --- | --- |
| scripts | *string* url| loads the script tag in the header and points it to the url  |
| styles | *string* url, *string* media | loads the link tag in the header and points it to the url. media defaults to stylesheet |

####unload

| method | arguments | description |
| --- | --- | --- |
| scripts | *string* url| unloads the script tag with the matching url  |
| styles | *string* url | unloads the link tag with the matching url |

####elements

| method | arguments | description |
| --- | --- | --- |
| remove_by_id | *string* id| removes the matching element from it's parent node's childlist  |
| remove_by_classname | *string* classname | removes all elements with the matching classname from their parents's childlist |
