import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip, TripService } from '../../services/trip.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html'
})
export class DriverDashboardComponent implements OnInit, OnDestroy {
  messages: Subscription;
  trips: Trip[];
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private toastr: ToastrService
  ) {}
  get currentTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  }
  get requestedTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.status === 'REQUESTED';
    });
  }
  get completedTrips(): Trip[] {
    return this.trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  }
  ngOnInit(): void {
    this.route.data.subscribe((data: {trips: Trip[]}) => this.trips = data.trips);
    this.tripService.connect();
    this.messages = this.tripService.messages.subscribe((message: any) => {
      const trip: Trip = Trip.create(message.data);
      this.updateTrips(trip);
      this.updateToast(trip);
    });
  }
  updateTrips(trip: Trip): void {
    this.trips = this.trips.filter(thisTrip => thisTrip.id !== trip.id);
    this.trips.push(trip);
  }
  updateToast(trip: Trip): void {
    if (trip.driver === null) {
      this.toastr.info(`Rider ${trip.rider.username} has requested a trip.`);
    }
  }
  ngOnDestroy(): void {
    this.messages.unsubscribe();
  }
}
