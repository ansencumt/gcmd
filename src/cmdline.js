'use strict';
var vscode = require('vscode');
var path = require('path')

// getCommandLine 获取配置命令行信息
function getCommandLine() {
    var configuration = vscode.workspace.getConfiguration("gcmd");
    var cmdArray = [];

    var parten = /\{(.+?)\}/g;
    var genv = configuration.get("env");
    if (genv) {
        for (var item in genv) {                        
            var cmdStr = undefined;
            if (parten.test(genv[item])) {
                cmdStr = "set " + item + "=" + genv[item].replace(parten, replaceVar);
            } else {
                cmdStr = "set " + item + "=" + genv[item];
            }
            if(cmdStr)
                cmdArray.push(cmdStr.trim());
        }
    }
    return cmdArray;
}
exports.getCommandLine = getCommandLine

// replaceVar 替换环境变量
function replaceVar(whole, key) {
    console.log(key)
    if (!key || key.length == 0) return "";
    key = key.trim();
    switch (key) {
        case "currentpath":
            return currentPath()
        case "rootpath":
            return rootPath()
    }
    var val = getConfigByOriginalKey(key);
    if (val) return val;

    val = getProcessEnv(key)
    if (val) return val;

    return key;
}

// rootPath 获取当前是文件的目录
function rootPath() {
    return vscode.workspace.rootPath
}

// getConfigByOriginalKey 获取当前工作目录下的配置,若无配置，则传回undefine;
// originalKey 配置文件中的Key值，如：gcmd.go.gopath
function getConfigByOriginalKey(originalKey) {
    if (originalKey.indexOf('.') <= 0) {
        return vscode.workspace.getConfiguration("").get(originalKey);
    }

    var subKeys = originalKey.split('.');
    var config = vscode.workspace.getConfiguration(subKeys[0]);
    if (!config) return config;

    var valObj = config.get(subKeys[1])
    if (!valObj) return valObj;

    for (var i = 2; i < subKeys.length; i++) {
        valObj = valObj[subKeys[i]];
    }
    return valObj;
}

// getProcessEnv获取环境变量的值
function getProcessEnv(originalKey) {
    return process.env[originalKey];
}