# gcmd
Launch a new command line that target the current document path and contains the custom environment variables

# Commands
* ctrl+shift+p then gcmd:run

# Settings
By default, this extension use the native command line in your OS. But, you can override this behaviour by setting a different executable in the settings.json of your workspace. Here is an example if we prefer use custom environment variables :

// Place your settings in this file to overwrite default and user settings.
{
    "gcmd.env": {
        "GOPATH": "{go.gopath};{GOPATH}",
        "GOBIN":"d:\\golang\\bin"
    }
}

There are two reserved variables.They mean what their literal mean

* {currentpath}
* {rootpath}