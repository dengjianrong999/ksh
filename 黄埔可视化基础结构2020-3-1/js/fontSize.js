    Vue.mixin({
      methods:{
        remSize:function(rem){
          console.log($('html').width());
          return parseFloat($('html').css('font-size'))*rem;
        }
      }
    });