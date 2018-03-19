<template>
  <section class="qz-top">
    <img :src="topDate.bg" alt="" class="bg">
    <a class="icon">
      <img :src="topDate.src" alt="">
    </a>
    <div class="intro">
      <h5>{{topDate.tit}}</h5>
      <p>{{topDate.des}}</p>
      <p><span>{{topDate.nums.join}}</span>人参与&nbsp;&nbsp;&nbsp;&nbsp;<span>{{topDate.nums.theme}}</span>条主题</p>
    </div>
    <div class="btnarea">
      <a class="btn qzBtnContext">发布内容</a>
    </div>
  </section>
</template>

<script>
  import getJoinCount from '@/api/getJoinCount';
  export default {
    name: "club-top",
    data:function () {
      return {
        topDate:{
          bg:'http://imgs.gamersky.com/pic/2017/20171225_lq_52_1.jpg',
          src:'http://imgs.gamersky.com/pic/2017/20171208_lq_52_5.jpg',
          tit:'游民大杂烩',
          des:'欢迎来到游民大杂烩',
          nums:{
            join:0,
            theme:0
          }
        }
      }
    },
    props:['clubPm'],
    created(){
      let that = this;
      getJoinCount.getData(that,{
        jsondata: JSON.stringify({
          clubId: that.clubPm.cid,
          topicId: that.clubPm.tid
        })
      },(err,back) => {
        if(err){
          console.log(err);
        }else{
          let res = back.data,cards = res.clubContent,people = res.join;
          that.topDate.nums.join = people;
          that.topDate.nums.theme = cards;
        }
      });
    }
  }
</script>

<style lang="scss"></style>
