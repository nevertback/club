<template>
  <div class="qz-all-topic">
    <h5>全部话题</h5>
    <ul :page="page">
      <li v-for="item in listData" :key="item.Id">
        <a :href="'http://i.gamersky.com/m/topic/'+item.Id"><b>{{item.Title}}</b><span><i class="num-in">{{item.JoinNum}}</i>人参与<i class="num-comm">{{item.ThemeNum}}</i>条主题</span></a>
      </li>
    </ul>
    <a class="button" @click="next" >{{btnShow}}</a>
  </div>
</template>

<script>
  let btnTxt = [
    '加载更多话题','全部加载完成'
  ];
  import getTopicList from '@/api/getTopicList'
  export default {
    name: "topic",
    data(){
      return {
        listData:[],
        limit:4,
        page:1,
        loadAll:false,
        btnShow:btnTxt[0]
      }
    },
    created(){
      this.get();
    },
    watch:{
      page(val){
        this.get();
      }
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
            if(list.data.length<this.limit){
              this.loadAll = true;
              this.btnShow = btnTxt[1];
            }
          }
        })
      },
      next(){
        if(this.loadAll === false){
          this.page++;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .qz-all-topic{
    padding-bottom: 0.25rem;
  }
  .button{
    display: block;
    margin: 0.25rem 0.25rem 0;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 0.1rem;
  }
</style>
