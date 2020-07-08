import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './App.css';

import { DateBox } from 'devextreme-react/date-box';

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

class App extends React.Component {
  now = new Date();
  minDate = new Date(1900, 0, 1);

  constructor(props) {
    super(props);
    this.state = {
      dateBoxValue: this.now
    };
    this.getDisabledDates = this.getDisabledDates.bind(this);
    this.onValueChanged = this.onValueChanged.bind(this);
  }   
  
  getDisabledDates(args) {
    const dayOfWeek = args.date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; 
    return args.view === "month" && (isWeekend || isHoliday(args.date));
  }

  isHoliday(date) {
    for (let holiday of holidays) {
      if (date.getDate() === holiday.getDate() && date.getMonth() === holiday.getMonth()) {
        return true;
      }          
    }
    return false;
  }
  
  onValueChanged(e) {
    console.log(e.previousValue);
    console.log(e.value);
    this.setState({
      dateBoxValue: e.value
    });
  }  
  
  render() {
    return (
      <div className="App">
        <DateBox
          type="datetime"
          value={this.state.dateBoxValue}
          onValueChanged={this.onValueChanged}
          disabledDates={this.getDisabledDates}
          min={this.minDate}
          max={this.now}
        />
      </div>
    );    
  }

}

export default App;
