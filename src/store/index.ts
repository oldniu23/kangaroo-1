import clone from "@/lib/clone";
import createId from "@/lib/createId";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  //data
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  //methods
  mutations: {
    //获取本地的记录
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record) {
      //先克隆一遍再创建记录
      const record2: RecordItem = clone(record);
      //添加当前日期
      record2.createdAt = new Date();
      //如果recordList存在 就把record2(这是克隆后的值)push进recordList
      state.recordList.push(record2);
      //创建记录后保存记录
      store.commit("saveRecords");
      // recordStore.saveRecords();
    },
    saveRecords(state) {
      //把收集过record的recordList 字符串序列化并放到本地存储
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    //获取标签
    fetchTags(state) {
      return (state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      ));
    },
    //创建标签
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
        return "duplicated";
      }
      //不重复就创建id
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
      window.alert("添加成功");
      return "success";
    },
    //保存标签
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
});

export default store;
