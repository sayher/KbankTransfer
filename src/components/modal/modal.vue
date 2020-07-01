
<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal__title">
        <span>Session Expired</span>
      </div>
      <div class="p-3">
        <p>ກຳລັງອອກຈາກລະບົບ ພາຍໃນ.</p>
        <p>{{ second }} ວິນາທີ</p>
        <!-- <button @click.prevent="close">Close</button> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mapActions } from "vuex";

export default {
  data() {
    return {
      time: 10000
    };
  },
  computed: {
    second() {
      return this.time / 1000;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  created() {
    let timerId = setInterval(() => {
      this.time -= 1000;
      if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);

      if (this.time < 1) {
        clearInterval(timerId);
        // Your logout function should be over here
        // alert("logout user....");
        this.Logout();
      }
    }, 1000);
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    Logout() {
      this.LOGOUT().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../assets/css/modal.css";
</style>
