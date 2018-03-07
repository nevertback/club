<template>
    <div class="qz-card" v-bind:data-cardid="cdt.cardid">
      <header>
        <a class="head"><img :src="cdt.head" :alt="cdt.user"></a>
        <div class="info">
          <h5><a>{{cdt.user}}</a></h5>
          <p><span class="time">{{cdt.createtime}}</span></p>
        </div>
      </header>
      <section class="detail">
        <div class="content" v-html="cdt.text"></div>
        <div class="media-pic" v-if="picStyle.picbig">
          <figure>
            <a>
              <img :class="'previewer-demo-img'+cdt.cardid" v-for="(item, index) in list" :src="item.sml" @click="show(index)">
              <previewer :list="list" ref="previewer" :options="options"></previewer>
            </a>
          </figure>
        </div>
        <div class="media-pic-list" v-if="picStyle.piclist">
          <div class="clearfix qz-figs">
            <figure v-for="(item, index) in list">
              <a>
                <img :class="'previewer-demo-img'+cdt.cardid" :src="item.sml" @click="show(index)">
              </a>
            </figure>
            <previewer :list="list" ref="previewer" :options="options"></previewer>
          </div>
        </div>
      </section>
      <footer>
        <a class="btn-like qzBtnLike"><i></i><b>{{cdt.countlike}}</b></a><span></span>
        <a class="btn-comment qzBtnComment">{{cdt.countcomment}}</a>
      </footer>
    </div>
</template>

<script>
  import  {Previewer} from 'vux';
  export default {
    name: "club-card",
    components:{
      Previewer
    },
    props:['cdt'],
    data(){
      return {
        picStyle:{
          picbig:false,
          piclist:false
        },
        list:[],
        cardData:this.cdt,
        options:{}
      }
    },
    mounted(){
      if(this.cdt.picbig.url){
        this.picStyle.picbig = true;
        let tmpData = [];
        tmpData[0] = this.cdt.picbig;
        this.list = this.backListData(tmpData);
      }
      if(this.cdt.piclist.length > 1){
        this.picStyle.piclist = true;
        this.list = this.backListData(this.cdt.piclist);
      }
      let tmpCdt = this.cardData;
      this.options = {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img'+tmpCdt.cardid)[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    },
    methods:{
      backListData(dt){
        let newData = [];
        for(let i = 0;i<dt.length;i++){
          let size = dt[i].size.split('x');
          let eachData = {
            sml:dt[i].large,
            src:dt[i].url,
            w:parseInt(size[0],10),
            h:parseInt(size[1],10)
          };
          newData.push(eachData)
        }
        return newData;
      },
      show(index){
        this.$refs.previewer.show(index);
      }
    }
  }
</script>
<style scoped>
  .pswp{
    opacity: 1;
  }
</style>
