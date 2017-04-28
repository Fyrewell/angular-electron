'use strict';
const electron = require('electron');
// Module to control application life.
const {app, ipcMain} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === "--serve");

if (serve) {
  require('electron-reload')(__dirname, {
    electron: require('${__dirname}/../../node_modules/electron')
  })
  require('electron-context-menu')({
  	prepend: (params, browserWindow) => [{
  	}]
  });
}

function createWindow() {

    let electronScreen = electron.screen;
    let size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        width: 1200,
        height: 860,
        icon: __dirname + '/favicon.ico'
    });
    win.setMenu(null);

    let url = serve ?
      'file://' + __dirname + '/dist/index.html':
      'file://' + __dirname + '/index.html';

    // and load the index.html of the app.
    win.loadURL(url);

    ipcMain.on("console", function (ev) {
        var args = [].slice.call(arguments, 1);
        var r = console.log.apply(console, args);
        ev.returnValue = [r];
    });
    ipcMain.on("app", function (ev, msg) {
        var args = [].slice.call(arguments, 2);
        ev.returnValue = [app[msg].apply(app, args)];
    });
    //win.loadURL("file://" + __dirname + "/app.html");
    win.webContents.once("did-finish-load", function () {
        var http = require("http");
        var crypto = require("crypto");
        var server = http.createServer(function (req, res) {
            var port = crypto.randomBytes(16).toString("hex");
            win.webContents.send('request', req, port);
            ipcMain.once('response', (event, arg) => {
              res.setHeader('Content-Type', 'text/html');
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end(JSON.stringify(arg));
            });
        });
        server.listen(8000);
        console.log("http://localhost:8000/");
    });


    // Open the DevTools.
    //if (serve) {
      win.webContents.openDevTools();
    //}

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
