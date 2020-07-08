import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Getting started with DateBox';
  holidays: Date[];
  now: Date = new Date();
  minDate: Date = new Date(1900, 0, 1);

  constructor(service: AppService){
      this.holidays = service.getHolidays();
      this.getDisabledDates = this.getDisabledDates.bind(this);
  }

  onValueChanged(e){
      console.log(e.previousValue);
      console.log(e.value);
  }

    getDisabledDates(args): boolean {
        const dayOfWeek = args.date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; 
        return args.view === "month" && (isWeekend || this.isHoliday(args.date));
    }

  isHoliday(date): boolean {
      for (let holiday of this.holidays) {
          if (date.getDate() === holiday.getDate() && date.getMonth() === holiday.getMonth()) {
              return true;
          }          
      }
      return false;
  }
}
