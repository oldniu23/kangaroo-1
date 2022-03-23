function clone(data: any) {
  //深拷贝
  return JSON.parse(JSON.stringify(data));
}

export default clone;
