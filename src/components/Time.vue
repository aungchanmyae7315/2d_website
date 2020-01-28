<template>

    <p>{{ h }}:{{ m }}:{{ s }}</p>

  <!-- <section id="app" class="section">
    <p class="time shadow" v-text="currentTime"></p>
    </section> -->
</template>

<script>

  import Time from '../components/Time.vue'
  export default {
    
    components: {
        Time
    },
     data() {
      return {
          h: '',
          m: '',
          s: ''
      };
  },
    methods: {
       updateClock: function () {
    	let now = new Date();
    	this.h = this.leftPad(''+now.getHours());
      this.m = this.leftPad(''+now.getMinutes());
      this.s = this.leftPad(''+now.getSeconds());
       },
       leftPad: function(str) {
	        const leftPad = '00';
          return leftPad.substring(0, leftPad.length - str.length) + str;
    }
    },

   mounted: function () {
    setInterval(this.updateClock, 100);
  }
    
  };
</script>