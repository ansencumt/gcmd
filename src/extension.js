// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var setting = require('./setting');
var tsetting = require('./terminal-setting');
var exec = require("child_process")

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "go-builder-help" is now active!'); 

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.golang-cmd.run', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
        cmd = setting.getCommandLine();
		// vscode.window.showInformationMessage(cmd);
        exec.exec(cmd);
	});

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var tdisposable = vscode.commands.registerCommand('extension.golang-terminal.run', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
        cmdArray = tsetting.getCommandLine();
		// vscode.window.showInformationMessage(cmd);
        // exec.exec(cmd);
		t = vscode.window.createTerminal("golang-terminal");
		// t.sendText('echo "Init golang arguments"', true);
		// for(var cmd in cmdArray) {
		// 	t.sendText(cmd, true);
		// }
		cmdArray.forEach(function(item){
			t.sendText(item, true);
		});
		// t.sendText('echo "Success! Welcome to golang terminal"', true);
		t.show(false);
		console.log(cmdArray);
	});

	context.subscriptions.push(tdisposable);
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;