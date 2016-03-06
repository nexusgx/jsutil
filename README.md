# jsUtil

This is just a simple utility object that I use in my work from time to time. I may add things or remove them, but it's never really a finished project. 


# Documentation
##jsUtil object

####store

| property |type| description |
| --- | --- | --- |
| storage |Storage object| the Storage object to be used. Defaults to localStorage |

| method | arguments | description |
| --- | --- | --- |
| set | *string* name, *multiple* val| converts value to JSON and utilizes Storage.setItem to save the value locally  |
| get | *string* name | retrieves the value using Storage.getItem and parses the JSON |
| delete | *string* name | deletes the item from the Storage object completely |
| exists | *string* name | detects if the property already exists within the Storage object |
| purge |  | deletes all variables from the storage object that had been set by jsUtil |

####objects

| method | arguments | description |
| --- | --- | --- |
| get_properties | *object* obj| runs through the object and finds all it's properties |
| merge | *object obj1*, *object* obj2 | merges two objects into one new object. Properties of the second object will not be merged if the first object shares the same property name. The first object takes precedence.|
| clone| *object* obj, *string* type | clone the source object. set type to deep for a deep copy. type defaults to 'shallow' |

####arrays

| method | arguments | description |
| --- | --- | --- |
| in | *multiple* needle, *array* haystack | determines if the value exists in the array |

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
