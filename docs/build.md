Source files contained in `src/`
Client HTML/CSS is already contained within `dist/client`

## Full Build
`browserify src/client.js -o dist/client/scripts/vorld-decay.js`

Copy the following files and directories to `dist/`
* `src/server.js`
* `src/server/ folder`
* `src/common/ folder`
Note server.js needs to go in dist root in order for fury require lookup to work.

## Local Testing
Run server.js from `src/` folder.
Run `watchify src/client.js -o dist/client/scripts/vorld-decay.js`

## Deployment
Set version numbers on generated client js and update src links in html.
Ensure isLocalHost is set to false in both client and server scripts before deployment.

Make sure SSL key + cert is copied to `dist/misc/` as
* `privkey.pem`
* `fullchain.pem`
respectively.

SSH to VPS.
Make sure nvm is set to use node 10+.
Manually run node server on vps.

Ideally would be able to copy *just* `dist/` and `fury/` folders to server,
however deployment is much easier with a full submodule and `git pull`.

### TODO
* If we come up with a deploy process that isn't git pull should add build artifacts to gitignore
* Versioning to prevent caching problems forced Ctrl + F5
* Automatically update scripts or config based based on build type
