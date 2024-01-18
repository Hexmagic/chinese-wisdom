const vscode = require("vscode");



module.exports = {
  activate,
  deactivate
}

async function getData() {
  const res = await fetch('https://v1.hitokoto.cn/?encode=json&c=d&c=j&c=k&c=k&c=i&lang=cn');
  let data = await res.json();
  return data['hitokoto'];
}

function sleep_time(){
  let ten_minute = 60000*25;
  let random_ratio = 1+Math.random();
  let ans = random_ratio*ten_minute;
  return parseInt(ans);
}

function activate(context) {
  var item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  
  getData().then((data) => {
    item.text = data;
    item.show();
  })
  setInterval(() => {
    getData().then((data) => {
      item.text = data;
      item.show();
    });  
  }, sleep_time());


}

function deactivate() { }
