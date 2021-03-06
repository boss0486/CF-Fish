![SFS Logo](http://www.smartfoxserver.com/assets/images/logo_smartfoxserver.png)

## What is SmartFoxServer 2X ##

SmartFoxServer is a comprehensive SDK for rapidly developing multiplayer games and applications using all the major web and mobile technologies like *Adobe Flash*, *Unity*, *iOS*, *Android*, *Windows Phone* and, in particular, **HTML5 / JavaScript**.

SmartFoxServer comes with a **rich set of features**, an impressive documentation set, a large number of **examples with their source code**, powerful administration tools, a free Community Edition and a very active support forum.

Born in 2004 and evolving continuously since then, today **SmartFoxServer 2X** (aka **SFS2X**) keeps expanding the core SmartFoxServer philosophy established by the previous Basic and Pro editions, making our platform the **leading middleware** to create large scale multiplayer games, MMOs and virtual communities.

Thanks to its **simplicity of use**, **versatility** and **performance**, SmartFoxServer currently powers hundreds of projects all over the world, from small chats and turn-based games to massive virtual worlds and realtime games.

Please visit **[smartfoxserver.com](http://www.smartfoxserver.com)** to get started.

## JavaScript client API for SFS2X ##

This npm package installs the latest version of the SmartFoxServer 2X client API for JavaScript, enabling games and applications developed with this programming language to "speak" the SFS2X protocol and interact with the server very easily and securely.

**RELEASE NOTES**: https://www.smartfoxserver.com/download/releaseNotes/SFS2X_API_JavaScript-bin.txt

**NOTE ON VERSIONING**: the version number of this package mirrors the JavaScript API version number on the SmartFoxServer website. In case of changes to this *readme* document only, a letter will be added (for example **1.7.10-a**).

### Installation ###

To install the SFS2X API package for JavaScript, go to your project's folder in a terminal/console window and execute this command:
```bash
npm install sfs2x-api --save
```
This automatically adds the *sfs2x-api* entry in the dependancies section of your project's package.json file.

### Usage ###

In your project you can use a module bundler (we recommend [webpack](https://webpack.js.org)) and the ES2015 module loading syntax to access the API, like this:
```
import * as SFS2X from "sfs2x-api";
```

You can then instantiate the API classes by means of the SFS2X namespace. The following example shows how to create an instance of the main SmartFox class, add a few listeners and establish a connection with SmartFoxServer.
```
var sfs = new SFS2X.SmartFox();
sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);

sfs.connect(127.0.0.1, 8080);

function onConnection(evtParams)
{
     if (evtParams.success)
         console.log("Connected to SmartFoxServer 2X!");
     else
         console.log("Connection failed. Is the server running at all?");
}
```

### Basic example ###

A complete, yet simple example showing how to setup your npm project and build it using **webpack** is available [here](http://docs2x.smartfoxserver.com/ExamplesJS/connector-npm-webpack).

### Other resources ###

* Full SmartFoxServer documentation: http://docs2x.smartfoxserver.com
* JavaScript client API documentation: http://docs2x.smartfoxserver.com/api-docs/jsdoc/client/
* HTML5 tutorials and examples: http://docs2x.smartfoxserver.com/ExamplesJS/introduction
