<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    background-color: #f2f2f3;
  }

  a{
    text-decoration: none;
  }
  ul,ol,li,h1,h2,h3,h4,h5,h6,p{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .clearfix{
  &:before,&:after{display:table;content:" "}
  &:after{clear:both}
  }
  #app {
    margin: 0 auto;
    width: 6.4rem;
    font-family: STHeiti,'Microsoft YaHei',Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 0.24rem;
  }
</style>
