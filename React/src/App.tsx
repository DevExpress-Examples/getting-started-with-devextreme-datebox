import { useCallback, useState } from 'react';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import './App.css';
import DateBox from 'devextreme-react/date-box';
import type { DateBoxTypes } from 'devextreme-react/date-box';
import { holidays } from './data';

interface DisabledDateArgs {
  date: Date;
  view: string;
}

function App(): JSX.Element {
  const now = new Date();
  const minDate = new Date(1900, 0, 1);
  const [dateBoxValue, setDateBoxValue] = useState<Date>(now);

  const onValueChanged = useCallback((e: DateBoxTypes.ValueChangedEvent) => {
    console.log(e.previousValue); // eslint-disable-line no-console
    console.log(e.value); // eslint-disable-line no-console
    setDateBoxValue(e.value);
  }, []);

  const getDisabledDates = useCallback((args: DisabledDateArgs): boolean => {
    const dayOfWeek = args.date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    return args.view === 'month' && (isWeekend || isHoliday(args.date));
  }, []);

  const isHoliday = useCallback((date: Date): boolean => {
    for (const holiday of holidays) {
      if (date.getDate() === holiday.getDate() && date.getMonth() === holiday.getMonth()) {
        return true;
      }
    }
    return false;
  }, []);

  return (
    <div className="app">
      <DateBox
        type="datetime"
        value={dateBoxValue}
        onValueChanged={onValueChanged}
        disabledDates={getDisabledDates}
        min={minDate}
        max={now}
        label="Date and time"
        labelMode="floating"
      />
    </div>
  );
}

export default App;
