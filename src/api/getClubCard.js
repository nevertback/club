const cardUrl = '/api/club/api/getwapclubcontent';

export default {
  cardDataBack(thisTmp,data,callback){
    thisTmp.$axios.get(cardUrl,{
      params:data
    }).then(val => callback(null,val))
      .catch(e => callback(e));
  }
}
