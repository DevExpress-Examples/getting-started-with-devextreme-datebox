<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDateBox from 'devextreme-vue/date-box';
import type { DxDateBoxTypes } from 'devextreme-vue/date-box';
import { holidays, type DisabledDateArgs } from '../data';

const now = new Date();
const minDate = new Date(1900, 0, 1);

function onValueChanged(e: DxDateBoxTypes.ValueChangedEvent): void {
  console.log(e.previousValue); // eslint-disable-line no-console
  console.log(e.value); // eslint-disable-line no-console
}

function getDisabledDates(args: DisabledDateArgs): boolean {
  const dayOfWeek = args.date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  return args.view === 'month' && (isWeekend || isHoliday(args.date));
}

function isHoliday(date: Date): boolean {
  for (const holiday of holidays) {
    if (date.getDate() === holiday.getDate() && date.getMonth() === holiday.getMonth()) {
      return true;
    }
  }
  return false;
}
</script>

<template>
  <div id="container">
    <DxDateBox
      type="datetime"
      :value="now"
      @value-changed="onValueChanged"
      :disabled-dates="getDisabledDates"
      :min="minDate"
      :max="now"
      label="Date and time"
      label-mode="floating"
    />
  </div>
</template>

<style scoped>
#container {
  width: 400px;
}
</style>
