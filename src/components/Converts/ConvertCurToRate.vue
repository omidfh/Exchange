<template>
  <transition name="fade">
    <div class="tabdil" v-if="this.$store.getters.appIsStarted === 'visible'">
      <div
        class="label"
        v-if="
          this.$store.getters.firstCountryCurrency &&
          this.$store.getters.secondCountryCurrency
        "
      >
        <h2 class="cur1">
          {{ this.$store.getters.firstCountryCurrency }}
        </h2>
        <h2>To</h2>
        <h2 class="cur2">
          {{ this.$store.getters.secondCountryCurrency }}
        </h2>
      </div>
      <form>
        <input
          type="number"
          class="input"
          placeholder="َAmount"
          v-model="amount"
        />
        <button
          type="submit"
          class="button convert"
          @click.prevent="getCurrency"
          v-if="amount"
        >
          Convert
        </button>
      </form>

      <p class="converted" v-if="convertedAmount">
        {{ convertedAmount }}
      </p>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      firstCountryCurrency: null,
      secondCountryCurrency: null,
      amount: null,
      conversationRate: null,
      convertedAmount: null,
    };
  },
  methods: {
    async getCurrency() {
      try {
        this.firstCountryCurrency = this.$store.getters.firstCountryCurrency;
        this.secondCountryCurrency = this.$store.getters.secondCountryCurrency;

        //////////////////
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/9e1b29b46dbc60fa0fb2a56d/pair/${this.firstCountryCurrency}/${this.secondCountryCurrency}`
        );
        const data = await res.json(res);

        if (
          this.firstCountryCurrency === "IRR" ||
          this.secondCountryCurrency === "IRR"
        )
          this.convesationRate = data.conversion_rate.toFixed(0);
        /////////////////////
        ///////////////////
        if (!this.amount || +this.amount <= 0 || isNaN(+this.amount) === true)
          throw Error("Amount Should Be Filled With Positive Numbers");
        this.conversationRate = data.conversion_rate;
        this.convertedAmount =
          (+this.amount * this.conversationRate).toFixed(2) +
          `(${this.secondCountryCurrency})`;
        console.log(data);
        /////////////
      } catch (err) {
        this.renderError(err);
      }
    },
  },
  watch: {},
};
</script>

<style>
.tabdil {
  text-align: center;
  width: 100%;
}
.label {
  display: flex;
  margin: 10px 0;
  font-size: medium;
  width: 100%;
  text-align: center;
}
.cur1,
.cur2,
h2 {
  width: 50%;
  display: inline-block;
  font-weight: 400;
}
.input {
  text-align: center;
  font-size: medium;
  width: 70%;
  height: 28px;
  display: block;
  border-radius: 5px;
  border: 1px grey solid;
  margin: 10px auto;
  padding: 5px;
  /* background-color: #87cfeb0f; */
}
.input:hover {
  background-color: #87cfeb0f;
}
.converted {
  display: block;
  padding: 15px;
  font-size: 30px;
  background-color: rgba(240, 248, 255, 0.642);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* Adjust duration as needed */
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
