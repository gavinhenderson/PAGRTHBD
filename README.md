# PAGRTHBD (Name TBC)
> probably-a-good-reason-this-hasnt-been-done (TBC)

I often find myself writing javascript fontend and backend. Often I write a function on the backend and then do a lot of faff to expose that function to the frontend (usually via REST), then more faff on the frontend to consume it.

My idea is to blend the frontend and backend codebase together by allowing frontend files to import backend functions, then some magic boilerplate code makes the network hop happen.

Prior art

- AWS Amplify (kinda?)
- https://github.com/pacedotdev/oto
- Probably lots more but I couldnt think of a google search

In order to run the backend it would probably make sense to provide a cli that you call that points to the Backend.js file which basically makes the exported functions into a REST API.

The frontend would probably use some kind of webpack magic plugin (that would have to be written) that would convert the import from a specified backend folder into corresponding rest requests

backend.js: 
```js
let todos = []

export const backendFuncAddTodo = (newTodo) => {
  todos.push(newTodo)
  return todos
}
```

frontend.js
```js
// Could provide some react hook wrapper or something aswell
import { backendFuncAddTodo } from '../../backend'

const newTodos = await addTodo({title: 'Added' })

document.AddToDOMCouldntBeArsedMakingThisCodeRealButYouGetThePoint(newTodos)
```
