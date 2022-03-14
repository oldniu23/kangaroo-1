<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectTypes('-')">
        支出
      </li>
      <li :class="type === '+' && 'selected'" @click="selectTypes('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="js">
import Vue from "vue";

export default Vue.extend({
  data(){
    return {
      type:'-' //-号表示支出 +号表示收入
    }
  },
  props:['xxx'],
  mounted(){
    console.log(this.xxx);
  },
  methods:{
    selectTypes(type){
      //类型只能是+- 否则抛出错误
      if(type !=='+' && type !=='-'){
        throw new Error('未知类型');
      }
      this.type = type
    }
  }
});
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>