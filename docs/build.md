Source files contained in `/src`
Client HTML/CSS is already contained within `/dist/client`

Full Build should:
* Rebuild fury.js from submodule
* Browserify client.js outputting to `/dist/client`
* Copy any necessary files for server to `/dist/server`  

Client Build:
`browserify src/client.js -o dist/client/scripts/vorld-decay.js`

Server Build:
"Necessary Files" are:
* `src/server.js`
* `src/server/ folder`
* `src/common/ folder`
