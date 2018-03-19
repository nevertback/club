const topicUrl = 'http://i.gamersky.com/club/api/getjoincount';

export default {
  getData(thisTmp,data,callback){
    thisTmp.$http.jsonp(topicUrl,{
      params:data
    }).then(val => callback(null,val))
      .catch(e => callback(e));
  }
}
