import { Component } from '@angular/core';
import { DxDateBoxTypes } from 'devextreme-angular/ui/date-box';
import { AppService } from './app.service';

interface DisabledDateArgs {
  date: Date;
  view: string;
}

import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';

@Component({
    selector: 'app-root',
    imports: [DxDateBoxModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  holidays: Date[];

  now: Date = new Date();

  minDate: Date = new Date(1900, 0, 1);

  constructor(service: AppService) {
    this.holidays = service.getHolidays();
    this.getDisabledDates = this.getDisabledDates.bind(this);
  }

  onValueChanged(e: DxDateBoxTypes.ValueChangedEvent): void {
    console.log(e.previousValue);
    console.log(e.value);
  }

  getDisabledDates(args: DisabledDateArgs): boolean {
    const dayOfWeek = args.date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    return args.view === 'month' && (isWeekend || this.isHoliday(args.date));
  }

  isHoliday(date: Date): boolean {
    for (const holiday of this.holidays) {
      if (date.getDate() === holiday.getDate() && date.getMonth() === holiday.getMonth()) {
        return true;
      }
    }
    return false;
  }
}
