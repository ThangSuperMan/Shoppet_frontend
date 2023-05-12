import { Component, ElementRef, ViewChild } from '@angular/core';
import { GeolocationService } from 'src/app/_services/geolocation/geolocation.service';
import { Location } from '@models';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  isShowAddAddressWindow: boolean = false;
  years: number[] | undefined;
  lat = 10.82302;
  lng = 106.62965;
  latitudePicker = 10.82302;
  longitudePicker = 106.62965;
  address: string = '';
  city: string = '';
  district: string = '';

  constructor(private geolocationService: GeolocationService) {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, index) => currentYear + index);
  }

  ngOnInit() {}

  handleClickOverlay(): void {
    console.log('handleClickOverlay');
    this.isShowAddAddressWindow = false;
  }

  handleAddAddress(): void {
    this.isShowAddAddressWindow = true;
  }

  handleCloseAddressWindow(): void {
    this.isShowAddAddressWindow = false;
  }

  handlePickUpLocation(event: Location) {
    console.log('handlePickUpLocation');
    this.latitudePicker = event.coords.lat;
    this.longitudePicker = event.coords.lng;
    console.log('latPicker :>> ', this.latitudePicker);
    console.log('lngPicker :>> ', this.longitudePicker);
    this.geolocationService
      .getGeolocation(this.latitudePicker, this.longitudePicker)
      .subscribe({
        next: (response: any) => {
          console.log('response :>> ', response);
        },
        error: (error: any) => {
          console.log('error :>> ', error);
        },
      });
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
    }
  }

  showPosition(position: GeolocationPosition) {
    console.log(
      'Latitude: ' +
        position.coords.latitude +
        ', Longitude: ' +
        position.coords.longitude
    );
  }
}
