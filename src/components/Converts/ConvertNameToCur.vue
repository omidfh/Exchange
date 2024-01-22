<template>
  <transition name="fade">
    <div
      class="form-container"
      v-if="this.$store.getters.appIsStarted === 'visible'"
    >
      <div class="input-container">
        <input
          class="country"
          type="text"
          name="country1"
          id="first"
          placeholder="Country1"
          v-model="firstCountryInput"
          @input="resetSubmission"
        />

        <p class="to">To</p>

        <input
          class="country"
          type="text"
          name="country2"
          id="second"
          placeholder="Country2"
          v-model="secondCountryInput"
          @input="resetSubmission"
        />
      </div>
      <form
        class="button-container"
        v-if="inputsFilled && !submittedCountryNames"
      >
        <button class="button" type="submit" @click.prevent="convertNameToCur">
          Submit Countries
        </button>
      </form>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      submittedCountryNames: false,
      firstCountryInput: "",
      secondCountryInput: "",
      firstCountryCurrency: null,
      secondCountryCurrency: null,
    };
  },
  methods: {
    async convertNameToCur() {
      try {
        console.log("start action");
        if (!this.firstCountryInput || !this.secondCountryInput)
          throw Error("No Country Written");
        ///////////////////////

        const res = await fetch(
          `https://restcountries.com/v3.1/name/${this.firstCountryInput}`
        );
        ////////////////////
        const res2 = await fetch(
          `https://restcountries.com/v3.1/name/${this.secondCountryInput}`
        );
        /////////////////////
        const data1 = await res.json();
        if (res.ok === false) throw Error("Country 1 Name");
        ///////////////////////
        const data2 = await res2.json();
        if (res2.ok === false) throw Error("Country 2 Name");

        ////////////////
        if (data1.length === 2) {
          this.firstCountryCurrency = Object.keys(data1[1].currencies)[0];
        } else {
          this.firstCountryCurrency = Object.keys(data1[0].currencies)[0];
        }
        ////////////////////
        if (data2.length === 2) {
          this.secondCountryCurrency = Object.keys(data2[1].currencies)[0];
        } else {
          this.secondCountryCurrency = Object.keys(data2[0].currencies)[0];
        }
        // console.log();
        this.$store.dispatch(
          "updateFirstCountryCur",
          this.firstCountryCurrency
        );
        this.$store.dispatch(
          "updateSecondCountryCur",
          this.secondCountryCurrency
        );
        this.submittedCountryNames = true;
      } catch (err) {
        console.log(err.message);
        throw err.message;
      }
    },
    resetSubmission() {
      this.submittedCountryNames = false; // Reset the submission state when inputs change
    },
  },
  computed: {
    inputsFilled() {
      return (
        this.firstCountryInput.trim() !== "" &&
        this.secondCountryInput.trim() !== ""
      );
    },
  },
};
</script>
<style>
.names {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center; /* Center the form horizontally */
}
.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content vertically */
  width: 100%;
}
.country {
  text-align: center;
  width: 48%;
  height: 25px;
  padding: 5px;
  margin: 15px;
  font-size: medium;
  border-radius: 5px;
  border: 1px grey solid;
  /* display: block; */
}
.to {
  font-size: 25px;
  /* width: 20%;
  text-align: center; */
}
.button {
  margin-top: 20px; /* Adjust margin to create space between inputs and button */
  padding: 10px 20px;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: rgba(
    154,
    224,
    183,
    0.8
  ); /* Adjust alpha for transparency */
  color: black;
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
