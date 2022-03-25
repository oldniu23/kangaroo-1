//Object.freeze就是不准别人再变动了
//如果只用const还是可以push进东西的
const intervalList = Object.freeze([
  { text: "按天", value: "day" },
  { text: "按周", value: "week" },
  { text: "按月", value: "month" },
]);

export default intervalList;
