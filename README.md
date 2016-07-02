# Miraze

 - This is a framework for quickly stubbing a RESTful service. 
 - Defining a webserver purely on basis of request/response json contracts. 
 - Parsing JSON templates, based on request body/path/query params.

## JSO-NG

 - JSO-NG is a templating language for serving json content. \
 - It extends the notion of compiling html templates to json.

## So what can you do with this ?

You can use this to quickly setup a web-server that can stub a RESTful  remote server.

## A sample script :

```javascript
var miraze     = require("./miraze").create();
miraze.post("/user").sendFile("../sample/create.json");
miraze.get("/user/:id").sendFile("../sample/request-path-param.json");
miraze.get("/user").sendFile("../sample/request-url-param.json");

miraze.app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
```

## Using expressions in JSO-NG

Given a __hello.json__ is : 
```javascript
{
  "body": {
    "message": "hello",
    "id": "{{0 + 1 }}"
  }
}
```
And following url mapping is declared 
```javascript
miraze.post("/user").sendFile("../sample/hello.json")
```

Then making a __GET__ request to __'/user'__ results in : 
 ```json
 {
    "message": "hello",
    "id": "1"
}
 ```
## Using request path parameters
Given we declare following url :

```javascript
 miraze.get("/user/:id").sendFile("../sample/request-path-param.json");
```
and __request-path-param.json__ is : 
```javascript
{
  "body": {
    "id"      :"{{request.path.id}}",
    "name"    : "someone"
  }
}
```
Then if a request is made to url **"user/101"**, above template renders to : 
```json
{
  "id": "101",
  "name": "someone"
}
```
## Using request url params in response : 
Given we declare following url :

```javascript
miraze.get("/user").sendFile("../sample/request-url-param.json");
```

and __request-url-param.json__ is : 
```javascript
{
  "body": {
    "search"  :"{{request.query.search}}",
    "page"   : "{{request.query.page}}",
    "size"   : "{{request.query.size}}"
  }
}
```

Then if a request is made to url __"/user?search=searchme&page=32&size=21"__; the above template renders to : 
```json
{
    "search": "searchme",
    "page": "32",
    "size": "21"
}
```

## Using request body in response : 

Given we declare following url :
```javascript
miraze.post("/user").sendFile("../sample/create.json");
```
and __create.json__ is : 
```json
{
"body": {
  "id"      :"1",
  "name"    : "{{request.body.name}}",
  "address" : {
    "street" : "{{request.body.address.street}}"
    }
  }
}
```
And we make a __POST__ request is made to url __"/user"__ with below body : 
```json
{
    "name": "Me",
    "address": {
      "street" : "MyPlace"
    }
}
```

Then we get following reponse : 
```json
{
    "id": "1",
    "name": "Me",
    "address": {
        "street": "MyPlace"
    }
}
```

## Include templates by path

Given we declare following url :
```javascript
miraze.get("/include").sendFile("sample/include/__partial.json");
```
and __template.json__ is :
```json
{
  "body" : {
    "source" : "parent-template",
    "@include" : "sample/include/__partial.json"
  }
}
```
And sample/include/____partial.json__ exists as
```json
{
  "message"   : "hello",
  "sum"       : "{{0 + 1 }}",
  "boolean"   : "{{1 == 2}}",
  "list"      : "{{ 'one,two,three,four,five'.split(',') }}",
}
```

Then we get following reponse :
```json
{
  "source" : "parent-template",
  "boolean": false,
  "list": ["one", "two", "three", "four", "five"],
  "message": "hello",
  "sum": 1
}
```

**Coming up...**
 - support **response status** (200, 201, 404..)
 - support for **cookies**
 - asynchronous actions in controller
 - services and dependency injection

