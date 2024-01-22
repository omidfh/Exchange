<template>
  <transition name="fade">
    <div class="sub_main">
      <button
        class="start"
        @click="this.$store.commit('startApp')"
        v-if="this.$store.getters.appIsStarted === 'invisible'"
      >
        Start !
      </button>
      <div class="inputs">
        <convert-name-to-cur></convert-name-to-cur>
      </div>
      <div class="converts">
        <convert-cur-to-rate></convert-cur-to-rate>
      </div>
    </div>
  </transition>
</template>

<script>
import ConvertCurToRate from "./components/Converts/ConvertCurToRate.vue";
import ConvertNameToCur from "./components/Converts/ConvertNameToCur.vue";

export default {
  components: { ConvertNameToCur, ConvertCurToRate },
};
</script>

<style>
body {
  background-color: rgba(253, 252, 212, 0.668);
  box-sizing: border-box;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background: linear-gradient(135deg, #e0e0e0, #f1f1f1);
}

#app {
  background: linear-gradient(135deg, #6ec5b5, #d1d1d1);
  max-width: 600px;
  height: auto;
  width: 100%;
  margin: 150px auto;
  align-items: center;
  display: flex;
  justify-content: center;
  border: 1px solid #ebebeb;
  border-radius: 12px;
  padding: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.sub_main {
  display: block;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: auto;
  background-color: #effff297;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
article {
  text-align: center;
}

/* Add this to your CSS stylesheet */
.start {
  display: block;
  padding: 10px 20px;
  background-color: #198cd9a3; /* Set your desired button color */
  color: #fff; /* Set text color to contrast with the button color */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
  margin: auto;
}

.start:hover {
  background-color: rgba(52, 152, 219, 0.8); /* Adjust alpha for transparency */
}

.start::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: inherit;
  z-index: -1;
  filter: blur(20px); /* Adjust the blur amount for a glassy effect */
}

.start:hover {
  background-color: #6ac0007d;
  color: black;
}
.inputs,
.converts {
  /* width: 70%; */
  display: block;
  justify-content: center;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s; /* Adjust duration as needed */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
