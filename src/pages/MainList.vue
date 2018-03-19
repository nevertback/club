<template>
  <div class="main-list" v-scroll="loadMore">
    <club-top :clubPm="getCardConfig"></club-top>
    <topic-top></topic-top>
    <section class="qz-box qzIndex">
      <!--圈子页导航-->
      <div class="qzNavPos"></div>
      <aside class="qz-nav qzNavFxW">
        <nav class="clearfix qzNavFx">
          <a :class="nav.selected===idx?'cur':''" v-for="(item,idx) in nav.list" :key="idx" @click="navChange(idx)">{{item.txt}}</a>
        </nav>
      </aside>
      <!--todo 列表分离成组件 解决加载更多的bug-->
      <club-card v-for="(card,idx) in cardsData" :cdt="card" :key="card.cardid"></club-card>
    </section>
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
        nav:{
          selected:0,
          list:[
            {
              txt:'最新',
              sort:1,
              type:0,
              page:1,
              dataTmp:[]
            },
            {
              txt:'最热',
              sort:2,
              type:0,
              page:1,
              dataTmp:[]
            },
            {
              txt:'精品',
              sort:1,
              type:1,
              page:1,
              dataTmp:[]
            }
          ]
        },
        getCardSort:{
          sort:1,
          type:0,
          page:1
        },
        getCardConfig:{
          cid:2,
          tid:"",
          size:10,
          topic:""
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
    created(){
      this.getCd();
    },
    methods:{
      navChange(idx){
        this.nav.selected = idx;
        this.getCardSort.sort = this.nav.list[idx].sort;
        this.getCardSort.type = this.nav.list[idx].type;
        this.getCardSort.page = this.nav.list[idx].page;
        this.getCd();
      },
      getCd(callback){
        let that = this;
        getClubCard.cardDataBack(that,{
          jsondata:JSON.stringify({
            "contentType":that.getCardSort.type,
            "sort":that.getCardSort.sort,
            "pageIndex":that.getCardSort.page,
            "pageSize":that.getCardConfig.size,
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
            that.nav.list[that.nav.selected].dataTmp = that.nav.list[that.nav.selected].dataTmp.concat(listParse.cardgroup);
            that.cardsData = that.nav.list[that.nav.selected].dataTmp;
            if(typeof callback === 'function'){
              callback();
            }
          }
        })
      },
      loadMore(callback){
        let that = this;
        if(that.nav.list[that.nav.selected].page===1){
          that.nav.list[that.nav.selected].page++;
          that.getCardSort.page = that.nav.list[that.nav.selected].page;
        }
        this.getCd(callback);
        that.nav.list[that.nav.selected].page++;
        that.getCardSort.page = that.nav.list[that.nav.selected].page;
      }
    },
    directives: {
      scroll: {
        bind: function (el,binding){
          let scrollDisable = false,that = this;
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
