# gcmd
marketplace:https://marketplace.visualstudio.com/items?itemName=ansencumt.go-builder-help

Launch a new command line that target the current document path and contains the custom environment variables

# Commands
* ctrl+shift+p then golang-cmd:run launch a cmd.
* ctrl+shift+p then golang-terminal:run launch a terminal.

# Settings
By default, this extension use the native command line in your OS. But, you can override this behaviour by setting a different executable in the settings.json of your workspace. Here is an example if we prefer use custom environment variables :
``` javascript
// Place your settings in this file to overwrite default and user settings.
{
    "gcmd.env": {
        "GOPATH": "{go.gopath};{GOPATH}",
        "GOBIN":"d:\\golang\\bin"
    },

    "gterminal.env": {
        "GOPATH": "{go.gopath};{GOPATH}"
        ,"GOOS":"linux"
    }
}
```
There are two reserved variables.They mean what their literal mean

* {currentpath}
* {rootpath}


__note: The icon come from wjq345(wechat)__