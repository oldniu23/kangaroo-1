import createId from "@/lib/createId";

//tag store
const localStorageKeyName = "tagList";

const tagStore = {
  tagList: [] as Tag[],
  //获取标签
  fetchTags() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.tagList;
  },

  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
  //创建标签
  createTag(name: string) {
    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("标签名重复");
      return "duplicated";
    }
    //不重复就创建id
    const id = createId().toString();
    this.tagList.push({ id, name: name });
    this.saveTags();
    window.alert("添加成功");
    return "success";
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  //编辑标签页更新标签名
  updateTag(id: string, name: string) {
    const idList = this.tagList.map((item) => item.id);
    //如果此标签id存在
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map((item) => item.name);
      //如果修改的名字已存在
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.tagList.filter((item) => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return "success";
      }
    } else {
      return "not found";
    }
  },
  //保存标签
  saveTags() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.tagList)
    );
  },
};

tagStore.fetchTags();
export default tagStore;
