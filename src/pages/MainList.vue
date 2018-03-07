<template>
  <div class="main-list" v-scroll="loadMore">
    <club-top :topDt="topDate"></club-top>
    <topic-top></topic-top>
    <club-card v-for="card in cardsData" :cdt="card" :key="card.cardid"></club-card>
  </div>
</template>

<script>

  import ClubTop from '@/components/ClubTop'
  import TopicTop from '@/components/TopicTop'
  import ClubCard from '@/components/ClubCard'
  import getClubCard from '@/api/getClubCard'
  export default {
    name: "main-list",
    data(){
      return {
        topDate:{
          bg:'http://imgs.gamersky.com/pic/2017/20171225_lq_52_1.jpg',
          src:'http://imgs.gamersky.com/pic/2017/20171208_lq_52_5.jpg',
          tit:'游民大杂烩',
          des:'欢迎来到游民大杂烩',
          nums:{
            join:25642,
            theme:4560
          }
        },
        getCardConfig:{
          cid:4,
          tid:0,
          page:1,
          size:10,
          sort:1,
          topic:''
        },
        cardsData:[],
        scrollDisable:false
      }
    },
    components:{
      ClubTop,
      TopicTop,
      ClubCard
    },
    mounted(){
      this.getCd();
    },
    methods:{
      getCd(callback){
        let that = this;
        getClubCard.cardDataBack(that,{
          jsondata:JSON.stringify({
            "contentType":"2",
            "sort":that.getCardConfig.sort,
            "pageIndex":that.getCardConfig.page,
            "pageSize":that.getCardConfig.size - 1,
            "clubId":that.getCardConfig.cid,
            "topic":that.getCardConfig.topic,
            "topicId":that.getCardConfig.tid,
            "excludeIds":","
          })
        },(err,list) => {
          let listParse = JSON.parse(list.data.body);
          if(err){
            console.log(err);
          }else{
            that.cardsData = this.cardsData.concat(listParse.cardgroup);
            that.getCardConfig.page++;
            if(typeof callback === 'function'){
              callback();
            }
          }
        })
      },
      loadMore(callback){
        this.getCd(callback);
      }
    },
    directives: {
      scroll: {
        bind: function (el,binding){
          let scrollDisable = false;
          window.addEventListener('scroll', ()=> {
            if(document.documentElement.scrollTop + window.innerHeight >= el.clientHeight) {
              if(!scrollDisable) {
                loadMoreFunc();
              }
            }
          });
          function loadMoreFunc(){
            scrollDisable = true;
            let fnc = binding.value;
            fnc(function () {
              scrollDisable = false;
            });
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
