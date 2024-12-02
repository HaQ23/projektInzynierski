import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ReservationDto } from '../../../shared/model/api-models';

@Component({
  selector: 'app-user-visits',
  templateUrl: './user-visits.component.html',
  styleUrl: './user-visits.component.scss',
})
export class UserVisitsComponent implements OnInit {
  upcomingReservations: ReservationDto[] = [];
  pastReservations: ReservationDto[] = [];
  showUpcomingVisits: boolean = true;
  showPastVisits: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUpcomingReservations().subscribe((data) => {
      this.upcomingReservations = data.sort(
        (a, b) =>
          new Date(b.reservationDate).getTime() -
          new Date(a.reservationDate).getTime()
      );
    });

    this.userService.getPastReservations().subscribe((data) => {
      this.pastReservations = data.sort(
        (a, b) =>
          new Date(b.reservationDate).getTime() -
          new Date(a.reservationDate).getTime()
      );
    });
  }

  toggleUpcomingVisits(): void {
    this.showUpcomingVisits = !this.showUpcomingVisits;
  }

  togglePastVisits(): void {
    this.showPastVisits = !this.showPastVisits;
  }
  onReservationCancelled(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.userService.getUpcomingReservations().subscribe((data) => {
      this.upcomingReservations = data;
    });

    this.userService.getPastReservations().subscribe((data) => {
      this.pastReservations = data;
    });
  }
}
