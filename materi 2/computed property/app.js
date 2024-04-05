var app = new Vue({
  el: '#app',
  data: {
    slugText: 'Hello Vue'
  },
  computed: {
    now: function () {
      let date = new Date;
      return (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    },
    slugTize: function () {
      return this.slugText
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-') + ' ' + this.now;
    }
  },
  methods: {
    // now: function () {
    //   let date = new Date;
    //   return (`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    // },
    // slugTize: function () {
    //   return this.slugText
    //     .toLowerCase()
    //     .replace(/[^\w ]+/g, '')
    //     .replace(/ +/g, '-') + ' ' + this.now();
    // }
  }
})