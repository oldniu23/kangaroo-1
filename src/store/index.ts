import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Vuex不能有return返回值

const store = new Vuex.Store({
  //data
  state: {
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined, //currentTag除了可以是undefined还可以是Tag
  } as RootState,
  //methods
  mutations: {
    setCurrentTag(state, id: string) {
      const tag = state.tagList.filter((t) => t.id === id)[0];
      state.currentTag = tag;
    },
    //编辑标签页更新标签名   vuex规定只能传两个参数  payload就是object
    updateTag(state, payload: { id: string; name: string }) {
      // const id = object.id;
      // const name = object.name;
      // 析构语法
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      //如果此标签id存在
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        //如果修改的名字已存在
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        //不能用this了  用this也拿不到back方法 直接引入可以
        router.back();
      } else {
        window.alert("删除失败");
      }
    },

    //获取本地的记录
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      //先克隆一遍再创建记录
      const record2 = clone(record);
      //添加当前日期  转成字符串再添加
      record2.createdAt = new Date().toISOString();
      //如果recordList存在 就把record2(这是克隆后的值)push进recordList
      state.recordList.push(record2);
      //创建记录后保存记录
      store.commit("saveRecords");
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
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      //刚开始如果没标签就默认创建四个
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", "衣");
        store.commit("createTag", "食");
        store.commit("createTag", "住");
        store.commit("createTag", "行");
      }
    },
    //创建标签
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
      }
      //不重复就创建id
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
      window.alert("添加成功");
    },
    //保存标签
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
});

export default store;
