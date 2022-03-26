// 弄成T这种操作就是data是什么类型我就返回什么类型

function clone<T>(data: T): T {
  //深拷贝
  return JSON.parse(JSON.stringify(data));
}

export default clone;
