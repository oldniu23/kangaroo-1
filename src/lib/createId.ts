//获取id   从loclaStorage里获取当前最大id  或者id 为 0   然后转成数字
let id: number = parseInt(window.localStorage.getItem("_idMax") || "0") || 0;

function createId() {
  id++;
  //id 存到localStorage里
  window.localStorage.setItem("_idMax", id.toString());
  return id;
}

export default createId;
