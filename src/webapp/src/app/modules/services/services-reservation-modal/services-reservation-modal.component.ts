import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ModalService } from '../../shared/components/base-modal/modal.service';
import { ModalBase } from '../../shared/components/base-modal/modal.base';
import { Subject } from 'rxjs';
import {
  EmployeeDto,
  UnavailableDayDto,
  EmployeeScheduleRequest,
  OfferDto,
  ReservationRequest,
} from '../../shared/model/api-models';
import { EmployeeService } from '../services/employee.service';
import { InfoModalComponent } from '../../shared/components/info-modal/info-modal.component';
import { AuthService } from '../../auth/services/auth.service';

interface Day {
  date: Date;
  isAvailable: boolean;
}

@Component({
  selector: 'app-services-reservation-modal',
  templateUrl: './services-reservation-modal.component.html',
  styleUrls: ['./services-reservation-modal.component.scss'],
})
export class ServicesReservationModalComponent
  extends ModalBase
  implements OnInit
{
  @ViewChild('dateCarousel', { static: false }) dateCarousel!: ElementRef;
  @ViewChild('timeCarousel', { static: false }) timeCarousel!: ElementRef;

  employee!: EmployeeDto;
  dates: Day[] = [];
  visibleDates: Day[] = [];
  availableTimes: string[] = [];
  visibleTimes: string[] = [];
  selectedDate!: Date;
  selectedTime: string = '';
  message: string = '';
  numberOfVisibleDates: number = 7;
  numberOfVisibleTimes: number = 6;
  selectedTimeRange: 'morning' | 'afternoon' | 'evening' = 'morning';

  get selectedOffer(): OfferDto | undefined {
    return this.employee?.employeeOfferList?.[0];
  }

  get endTime(): string {
    if (!this.selectedTime || !this.selectedOffer) {
      return '';
    }
    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes);
    endDate.setMinutes(endDate.getMinutes() + Number(this.selectedOffer.time));
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  constructor(
    private modalService: ModalService,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    super();
    this.subject = new Subject<EmployeeDto>();
    this.subject$ = this.subject.asObservable();
    this.subject$.subscribe({
      next: (employee) => {
        this.employee = { ...employee };
        this.fetchUnavailableDays();
      },
    });
  }

  ngOnInit(): void {
    this.updateNumberOfVisibleElements();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateNumberOfVisibleElements();
  }

  updateNumberOfVisibleElements() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 576) {
      this.numberOfVisibleDates = 7;
      this.numberOfVisibleTimes = 6;
    } else if (windowWidth > 450) {
      this.numberOfVisibleDates = 5;
      this.numberOfVisibleTimes = 4;
    } else {
      this.numberOfVisibleDates = 4;
      this.numberOfVisibleTimes = 3;
    }

    this.updateVisibleDates();
    this.updateVisibleTimes();
  }

  fetchUnavailableDays() {
    this.employeeService
      .getUnavailableDays()
      .subscribe((unavailableDays: UnavailableDayDto[]) => {
        const unavailableDates = unavailableDays.map(
          (day) => new Date(day.date)
        );
        this.generateDates(unavailableDates);
        this.setFirstAvailableDate();
        this.updateVisibleDates();
      });
  }

  generateDates(unavailableDates: Date[]) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const isUnavailable = unavailableDates.some(
        (unavailable) => unavailable.toDateString() === d.toDateString()
      );
      this.dates.push({ date: new Date(d), isAvailable: !isUnavailable });
    }
  }

  setFirstAvailableDate() {
    for (const day of this.dates) {
      if (day.isAvailable) {
        this.selectDate(day.date);
        break;
      }
    }
  }

  updateVisibleDates(startIndex: number = 0) {
    this.visibleDates = this.dates.slice(
      startIndex,
      startIndex + this.numberOfVisibleDates
    );
  }

  updateVisibleTimes(startIndex: number = 0) {
    this.visibleTimes = this.availableTimes.slice(
      startIndex,
      startIndex + this.numberOfVisibleTimes
    );
    this.updateSelectedTimeRangeBasedOnVisibleTimes();
  }

  fetchAvailableTimes(date: Date) {
    const selectedOffer = this.selectedOffer;
    if (!selectedOffer) return;

    const request: EmployeeScheduleRequest = {
      employeeId: this.employee.id,
      date: date,
      serviceDurationMinutes: Number(selectedOffer.time),
    };

    this.employeeService.getAvailableTimeSlots(request).subscribe({
      next: (times: string[]) => {
        this.availableTimes = times;

        if (times.length === 0) {
          this.message = 'Brak dostępnych godzin dla tego dnia';
        } else {
          this.message = '';
          this.selectedTime = this.availableTimes.includes(this.selectedTime)
            ? this.selectedTime
            : times[0];
          this.updateVisibleTimes();
        }
      },
      error: (error) => {
        console.error('Error fetching available times:', error);
      },
    });
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    const selectedDay = this.dates.find(
      (day) => day.date.getTime() === date.getTime()
    );
    if (selectedDay && !selectedDay.isAvailable) {
      this.availableTimes = [];
      this.message = 'Brak dostępnych godzin dla tego dnia';
    } else {
      this.fetchAvailableTimes(date);
    }
  }

  selectTime(time: string) {
    this.selectedTime = time;
    this.updateTimeRangeBasedOnSelectedTime();
  }

  updateTimeRangeBasedOnSelectedTime() {
    if (this.isMorning(this.selectedTime)) {
      this.selectedTimeRange = 'morning';
    } else if (this.isAfternoon(this.selectedTime)) {
      this.selectedTimeRange = 'afternoon';
    } else if (this.isEvening(this.selectedTime)) {
      this.selectedTimeRange = 'evening';
    }
  }
  scrollDates(direction: string) {
    const currentIndex = this.dates.findIndex(
      (day) => day.date.getTime() === this.visibleDates[0].date.getTime()
    );
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - this.numberOfVisibleDates);
    } else {
      newIndex = Math.min(
        this.dates.length - this.numberOfVisibleDates,
        currentIndex + this.numberOfVisibleDates
      );
    }

    this.updateVisibleDates(newIndex);

    const selectedIndex = this.visibleDates.findIndex(
      (day) =>
        this.selectedDate && day.date.getTime() === this.selectedDate.getTime()
    );

    if (selectedIndex === -1) {
    } else {
      this.selectDate(this.selectedDate);
    }
  }

  scrollTimes(direction: string) {
    const currentIndex = this.availableTimes.findIndex(
      (time) => time === this.visibleTimes[0]
    );
    let newIndex = currentIndex;

    if (direction === 'left') {
      newIndex = Math.max(0, currentIndex - this.numberOfVisibleTimes);
    } else {
      newIndex = Math.min(
        this.availableTimes.length - this.numberOfVisibleTimes,
        currentIndex + this.numberOfVisibleTimes
      );
    }

    this.updateVisibleTimes(newIndex);
  }

  updateSelectedTimeRangeBasedOnVisibleTimes() {
    if (this.visibleTimes.length === 0) {
      return;
    }

    if (this.visibleTimes.some((time) => this.isMorning(time))) {
      this.selectedTimeRange = 'morning';
    } else if (this.visibleTimes.some((time) => this.isAfternoon(time))) {
      this.selectedTimeRange = 'afternoon';
    } else if (this.visibleTimes.some((time) => this.isEvening(time))) {
      this.selectedTimeRange = 'evening';
    }
  }

  scrollToTime(timeRange: 'morning' | 'afternoon' | 'evening') {
    this.selectedTimeRange = timeRange;
    let targetTimeIndex = -1;

    switch (timeRange) {
      case 'morning':
        targetTimeIndex = this.availableTimes.findIndex((time) =>
          this.isMorning(time)
        );
        break;
      case 'afternoon':
        targetTimeIndex = this.availableTimes.findIndex((time) =>
          this.isAfternoon(time)
        );
        break;
      case 'evening':
        targetTimeIndex = this.availableTimes.findIndex((time) =>
          this.isEvening(time)
        );
        break;
    }

    if (targetTimeIndex !== -1) {
      this.updateVisibleTimes(targetTimeIndex);
    }
  }

  isMorning(time: string): boolean {
    const hour = parseInt(time.split(':')[0], 10);
    return hour >= 6 && hour < 12;
  }

  isAfternoon(time: string): boolean {
    const hour = parseInt(time.split(':')[0], 10);
    return hour >= 12 && hour < 17;
  }

  isEvening(time: string): boolean {
    const hour = parseInt(time.split(':')[0], 10);
    return hour >= 17 && hour <= 22;
  }

  isTimeRangeAvailable(
    timeRange: 'morning' | 'afternoon' | 'evening'
  ): boolean {
    switch (timeRange) {
      case 'morning':
        return this.availableTimes.some((time) => this.isMorning(time));
      case 'afternoon':
        return this.availableTimes.some((time) => this.isAfternoon(time));
      case 'evening':
        return this.availableTimes.some((time) => this.isEvening(time));
      default:
        return false;
    }
  }

  getMonthDisplay(): string {
    if (this.visibleDates.length === 0) {
      return '';
    }

    const startMonth = this.visibleDates[0].date.toLocaleString('pl', {
      month: 'long',
    });
    const endMonth = this.visibleDates[
      this.visibleDates.length - 1
    ].date.toLocaleString('pl', { month: 'long' });
    const year = this.visibleDates[0].date.getFullYear();

    return startMonth === endMonth
      ? `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} ${year}`
      : `${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} - ${
          endMonth.charAt(0).toUpperCase() + endMonth.slice(1)
        } ${year}`;
  }

  override nextReject(): void {
    this.modalService.close();
  }

  override nextConfirm(): void {
    if (!this.authService.isAuthenticated()) {
      this.modalService.close();
      const resultModalRef = this.modalService.openModal(InfoModalComponent);
      resultModalRef.subject.next('Musisz być zalogowany, aby umówić wizytę.');
      return;
    }
    if (this.selectedDate && this.selectedTime && this.selectedOffer) {
      const reservationRequest: ReservationRequest = {
        reservationDate: this.selectedDate.toISOString().split('T')[0],
        reservationTime: this.selectedTime,
        employeeOfferId: this.selectedOffer.id,
      };

      this.asyncRequest(
        this.employeeService.addReservation(reservationRequest)
      ).subscribe({
        next: () => {
          this.modalService.close();
          const resultModalRef =
            this.modalService.openModal(InfoModalComponent);
          resultModalRef.subject.next(
            'Twoja usługa została pomyślnie zarezerwowana.'
          );
        },
        error: (error) => {
          console.error('Błąd podczas dodawania rezerwacji:', error);
          const resultModalRef =
            this.modalService.openModal(InfoModalComponent);
          resultModalRef.subject.next(
            'Wystąpił błąd podczas rezerwacji usługi. Spróbuj ponownie później.'
          );
        },
      });
    }
  }
}
