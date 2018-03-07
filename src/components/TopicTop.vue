<template>
    <div class="qz-more-topic">
      <ul :page="page">
        <li v-for="item in listData" :key="item.Id">
          <a :href="'http://i.gamersky.com/m/topic/'+item.Id">话题<b>{{item.Title}}</b><span><i class="num-comm">{{item.ThemeNum}}</i>条主题</span></a>
        </li>
      </ul>
      <div class="btnarea">
        <router-link class="topic-more" to="topic">更多话题</router-link>
      </div>
    </div>
</template>

<script>
  import getTopicList from '@/api/getTopicList'
  export default {
    name: "topic-top",
    data(){
      return {
        listData:[],
        limit:3,
        page:1,
      }
    },
    created(){
      this.get();
    },
    methods:{
      get(){
        getTopicList.getTl(this,{
          jsondata:JSON.stringify(({
            pageIndex: this.page,
            pageSize: this.limit
          }))
        },(err,list) => {
          if(err){
            console.log(err);
          }else{
            this.listData = this.listData.concat(list.data);
          }
        })
      }
    }
  }
</script>

<style lang="scss"></style>
