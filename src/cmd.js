'use strict';
var vscode = require('vscode');
var cmdline = require('./cmdline');
var cmdlinePs = require('./cmdline-powershell');
var exec = require("child_process")
var path = require('path')

function execute() {
	var configuration = vscode.workspace.getConfiguration("gcmd");
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
	}

	var pathName = currentPath();
    var cmdStr = 'start "Configurable Command Prompt" /i cmd /k cd /D "' + pathName + '"';
    cmdArray.push(cmdStr.trim());

	var cmdStr = cmdArrToString(cmdArray)
	exec.exec(cmdStr);
	console.log(cmdArray);
}

function cmdArrToString(cmdArray) {
	if (!cmdArray || cmdArray.length == 0) {
		return "";
	}
	var str = undefined;
	cmdArray.forEach(function (item) {
		if (str) {
			str += "& " + item;
		} else {
			str = item;
		}
	});
	return str;
}

// currentPath 获取当前是文件的目录
function currentPath() {
    return path.dirname(vscode.window.activeTextEditor.document.fileName);
}

exports.execute = execute