const { app } = require('electron');
//const { exec } = require('@mh-cbon/aghfabsowecwn')
const { execSync, spawn, spawnSync } = require('child_process')

var opts = {
  bridgeTimeout: 5000,    
  stdio: 'pipe',          
  env: {
    'FORCE_COLOR': 1,    
    'DEBUG': '*'      
  }
}

app.on('ready', () => {
  setInterval(function() {
    setPriority('Discord.exe')
  }, 1000);
});

function setPriority(a) {
  var output = execSync('wmic process where name="' + a + '" Call setpriority 128').toString()
  console.log(output)
}