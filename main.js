const { app } = require('electron')
const { execSync } = require('child_process')
const memoryjs = require('memoryjs')

app.on('ready', () => {
  isAdmin()
});

function setPriority(a) {
  if (findDiscord()) {
    execSync('wmic process where name="' + a + '" Call setpriority 128').toString()
  } else {
    app.quit()
  }
}

function findDiscord() {
  var processes = memoryjs.getProcesses()
  var x = processes.filter(x => x.szExeFile == 'Discord.exe')
  var bool;
  if (x.length > 0) {
    bool = true
  } else {
    bool = false
  }
  return bool
}

function isAdmin() {
  var exception = false, x

  try {
    x = execSync('whoami /groups | find "S-1-16-12288"').toString().trim()
  }

  catch (error) {
    exception = true
    throw Error('Please open as administrator.')
  }

  finally {
    if (!exception) {
      setInterval(function () {
        setPriority('Discord.exe')
      }, 1000);
    } else {
      app.quit()
    }
  }
}