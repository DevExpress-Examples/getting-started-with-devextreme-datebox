<template>
  <div id="app">
    <DxDateBox
      type="datetime"
      :value="now"
      @value-changed="onValueChanged"
      :disabled-dates="getDisabledDates"
      :min="minDate"
      :max="now"
      label="Select a date"
      label-mode="floating"
    />
  </div>
</template>

<script>
import { DxDateBox } from 'devextreme-vue/date-box';

const holidays = [
    new Date(0, 0, 1),
    new Date(0, 0, 20),
    new Date(0, 1, 17),
    new Date(0, 4, 10),
    new Date(0, 4, 25),
    new Date(0, 5, 21),
    new Date(0, 6, 4),
    new Date(0, 8, 7),
    new Date(0, 9, 5),
    new Date(0, 9, 12),
    new Date(0, 10, 11),
    new Date(0, 10, 26),
    new Date(0, 10, 27),
    new Date(0, 11, 24),
    new Date(0, 11, 25),
    new Date(0, 11, 31)
];

export default {
  name: 'App',
  components: {
    DxDateBox
  },
  data() {
    return {
      now: Date(),
      minDate: new Date(1900, 0, 1)
    }
  },
  methods: {
    onValueChanged(e) {
      console.log(e.previousValue);
      console.log(e.value);
    },
    getDisabledDates(args) {
        const dayOfWeek = args.date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; 
        return args.view === "month" && (isWeekend || this.isHoliday(args.date));
    },
    isHoliday(date) {
      for (let holiday of holidays) {
        if (date.getDate() === holiday.getDate() && date.getMonth() === holiday.getMonth()) {
          return true;
        }          
      }
      return false;
    }
  } 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
