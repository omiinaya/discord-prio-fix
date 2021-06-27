const { app } = require('electron')
const { execSync } = require('child_process')

app.on('ready', () => {
  isAdmin()
});

function setPriority(a) {
  execSync('wmic process where name="' + a + '" Call setpriority 128').toString()
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
    }
  }
}