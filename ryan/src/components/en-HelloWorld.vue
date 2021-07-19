<template>
  <div class="hello">
    <div>{{ this.$store.state }}</div>
    <div>{{ this.global_1 }}</div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      "bb" : this.global_1
    }
  },
  mounted: function () {
          // GET /someUrl
          this.$http.get(this.$store.state.url).then(response => {
               // console.log(response.data);
              // get body data
              // this.someData = response.body;
  
          }, response => {
              console.log("error");
          });
      },
  created() {
    this.global_1 = "global_1 global_1"
    console.log(this.global_1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
