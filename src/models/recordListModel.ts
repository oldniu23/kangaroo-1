const localStorageKeyName = "recordList";
const recordListModel = {
  data: [] as RecordItem[],
  //克隆的时候可以是一个也可以是数组 也就是可以传一项也可以传数组
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export default recordListModel;
