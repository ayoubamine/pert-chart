const electron = require('electron');
const { app, BrowserWindow } = electron;

var url = require('url')
const path = require('path');

let mainWindow;

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({
        center: true,
        minHeight: 600,
        minWidth: 900,
        height: 600,
        width: 900
    });

    // Disable the default menubar
    mainWindow.setMenu(null);

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});
