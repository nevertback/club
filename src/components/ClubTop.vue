<template>
  <section class="qz-top">
    <img :src="topDt.bg" alt="" class="bg">
    <a class="icon">
      <img :src="topDt.src" alt="">
    </a>
    <div class="intro">
      <h5>{{topDt.tit}}</h5>
      <p>{{topDt.des}}</p>
      <p><span>{{topDt.nums.join}}</span>人参与&nbsp;&nbsp;&nbsp;&nbsp;<span>{{topDt.nums.theme}}</span>条主题</p>
    </div>
    <div class="btnarea">
      <a class="btn qzBtnContext">发布内容</a>
    </div>
  </section>
</template>

<script>
    export default {
      name: "club-top",
      props:['topDt']
    }
</script>

<style lang="scss"></style>
