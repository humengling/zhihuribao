//https://news-at.zhihu.com
var baseUrl='/api'
//最新消息   轮播图 最新消息  index
var newMessage=baseUrl+'/api/4/news/latest';
//列表頁                     list
var listMessage =baseUrl+'/api/4/news';      //id在mount里已经var了

//过去消息
var oldMessage =baseUrl+'/api/4/news/before'      //push 2次   /20190710

//长评论
var longSay =baseUrl+'/api/4/story'  //  /8997528/long-comments

//短评论
var shortSay =baseUrl+'/api/4/story' //  /4232852/short-comments

//长短评额外新闻
var allSay =baseUrl+'/api/4/story-extra'

export default {
    newMessage,
    listMessage,
    oldMessage,
    longSay,
    shortSay,
    allSay
}