import createId from "@/lib/createId";

const localStorageKeyName = "tagList";

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
