const localStorageKeyName = "recordList";
const recordListModel = {
  //克隆的时候可以是一个也可以是数组 也就是可以传一项也可以传数组
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
};
export default recordListModel;
