# jsutil

This is just a simple utility object that I use in my work from time to time. I may add things or remove them, but it's never really a finished project. 


# Documentation
##jsUtil object

####local

| property |type| description |
| --- | --- | --- |
| loc |Storage object| the Storage object to be used. Defaults to localStorage |

| method | arguments | description |
| --- | --- | --- |
| set | *string* name, *multiple* val| converts value to JSON and utilizes Storage.setItem to save the value locally  |
| get | *string* name | retrieves the value using Storage.getItem and parses the JSON |
| delete | *string* name | deletes the item from the Storage object completely|
| exists | *string* name | detects if the property already exists within the Storage object|
