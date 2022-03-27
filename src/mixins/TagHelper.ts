//mixin 把创建标签功能抽离出来
import Vue from "vue";
import Component from "vue-class-component";

//表驱动编程 map配合下边捕获错误使用
const map: { [key: string]: string } = {
  "tag name duplicated": "标签名重复",
};

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", name);
    //捕获创建标签时的错误
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message] || "未知错误");
    }
  }
}

export default TagHelper;
