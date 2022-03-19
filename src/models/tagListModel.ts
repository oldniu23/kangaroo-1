import createId from "@/lib/createId";

const localStorageKeyName = "tagList";

type Tag = {
  id: string;
  name: string;
};
// 箭头前是输入的参数的类型 箭头后是输出的参数的类型  void是不返回
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //联合类型  success 表示成功 duplicated 表示name重复 返回值只能是这两个中的
  save: () => void;
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
};

const tagListModel: TagListModel = {
  data: [],
  create(name: string) {
    //this.data=[{id:'1',name:'1'},...] 拿到name放到names里
    const names = this.data.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      return "duplicated";
    }
    const id = createId().toString();
    this.data.push({ id, name: name });
    this.save();
    return "success";
  },
  update(id, name) {
    const idList = this.data.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.name = name;
        tag.id = name;
        this.save();
        return "success";
      }
    } else {
      return "not found";
    }
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
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },
};
export default tagListModel;
