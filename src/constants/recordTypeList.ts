//Object.freeze就是不准别人再变动了
//如果只用const还是可以push进东西的
const recordTypeList = Object.freeze([
  { text: "支出", value: "-" },
  { text: "收入", value: "+" },
]);

export default recordTypeList;
