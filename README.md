# jsutil
A simple javascript utility object 

# Documentation
##jsUtil object

####local
| method | arguments | description |
| --- | --- | --- |
| set | *string* name, *multiple* value| converts value to JSON and utilizes localStorage.setItem to save the value locally  |
| get | *string* name | retrieves the value using localStorage.getItem and parses the JSON |
| delete | *string* name | deletes the item from localStorage completely|
