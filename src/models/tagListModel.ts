const localStorageKeyName = "tagList";
// 箭头前是输入的参数的类型 箭头后是输出的参数的类型  void是不返回
type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string) => "success" | "duplicated"; //联合类型  success 表示成功 duplicated 表示name重复 返回值只能是这两个中的
  save: () => void;
};

const tagListModel: TagListModel = {
  data: [],
  create(name: string) {
    if (this.data.indexOf(name) >= 0) {
      return "duplicated";
    }
    this.data.push(name);
    this.save();
    return "success";
  },
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};
export default tagListModel;
