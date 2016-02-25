# jsutil

This is just a simple utility object that I use in my work from time to time. I may add things or remove them, but it's never really a finished project. 


# Documentation
##jsUtil object

####local
| method | arguments | description |
| --- | --- | --- |
| set | *string* name, *multiple* val| converts value to JSON and utilizes localStorage.setItem to save the value locally  |
| get | *string* name | retrieves the value using localStorage.getItem and parses the JSON |
| delete | *string* name | deletes the item from localStorage completely|
