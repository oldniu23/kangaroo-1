//recordStore 封装了专门针对数字板点击ok后money组件收集的四/五项数据的 获取/保存/创建、操作

import clone from "@/lib/clone";
const localStorageKeyName = "recordList";

const recordStore = {
  //recordList用来存放点击ok后收集的record
  recordList: [] as RecordItem[],

  //获取本地的记录
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.recordList;
  },

  //保存下边那个创建记录函数创建的记录
  saveRecords() {
    //把收集过record的recordList 字符串序列化并放到本地存储
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.recordList)
    );
  },

  //创建点击ok后record收集的值的记录
  createRecord(record: RecordItem) {
    //先克隆一遍再创建记录
    const record2: RecordItem = clone(record);
    //  转变成ISO字符串(日期转字符串稍微有点特殊) 并添加当前日期
    record2.createdAt = new Date().toISOString();
    //如果recordList存在 就把record2(这是克隆后的值)push进recordList
    this.recordList && this.recordList.push(record2);
    //创建记录后保存记录
    recordStore.saveRecords();
  },
};

//获取本地记录
recordStore.fetchRecords();

export default recordStore;
