const topicUrl = 'http://i.gamersky.com/club/api/gettopicall';

export default {
  getTl(thisTmp,data,callback){
    thisTmp.$http.jsonp(topicUrl,{
      params:data
    }).then(val => callback(null,val))
      .catch(e => callback(e));
  }
}
