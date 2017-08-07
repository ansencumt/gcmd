'use strict';
var vscode = require('vscode');
var cmdline = require('./cmdline');
var cmdlinePs = require('./cmdline-powershell');
var exec = require("child_process")
var path = require('path')

function execute() {
    var configuration = vscode.workspace.getConfiguration("gterminal");
    var shell = configuration.get("shell");
    var type = "cmd";
    if (shell && shell.type) {
        type = shell.type;
    }
    var cmdArray = []

    if (type == "powershell") {
        // Display a message box to the user
        cmdArray = cmdlinePs.getCommandLine();
    } else {
        cmdArray = cmdline.getCommandLine();
        var pathName = currentPath();
        var cmdStr = 'cd "' + pathName + '"';
        cmdArray.push(cmdStr.trim());
    }
    
    var t = vscode.window.createTerminal("golang-terminal");
    cmdArray.forEach(function (item) {
        t.sendText(item, true);
    });
    t.show(false);
    console.log(cmdArray);
}

// currentPath 获取当前是文件的目录
function currentPath() {
    return path.dirname(vscode.window.activeTextEditor.document.fileName);
}

exports.execute = execute