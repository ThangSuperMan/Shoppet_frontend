import { Component, ViewChild } from '@angular/core';
import { GeolocationService } from 'src/app/_services/geolocation/geolocation.service';
import { Address, Location } from '@models';
import { UserService } from 'src/app/_services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/_services/custom-validation/custom-validation.service';

/*
  Notes:
  // Add card (should valite form first)
  // Send card information to database
  // Send request paypal payment when click use this pay method
 */

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  addressForm!: FormGroup;
  isShowAddAddressWindow: boolean = false;
  isShowAddCardWindow: boolean = false;
  expirationMonthActiveNumber: string = '01';
  expirationYearActiveNumber: number = new Date().getFullYear();
  years: number[] | undefined;
  months: string[] = [];
  lat = 10.82302;
  lng = 106.62965;
  latitudePicker = 10.82302;
  longitudePicker = 106.62965;
  cardNumber: string = '';
  nameOnCard: string = '';
  securityCode: number = -1;
  address: string = '';
  city: string = '';
  district: string = '';
  @ViewChild('addCardForm') addCardForm!: NgForm;

  constructor(
    private toastService: ToastrService,
    private customValidator: CustomValidationService,
    private geolocationService: GeolocationService,
    private userSerivce: UserService
  ) {
    const currentYear = new Date().getFullYear();
    const zero = '0';
    this.years = Array.from({ length: 10 }, (_, index) => currentYear + index);
    for (let index = 1; index <= 12; index++) {
      if (index <= 9) {
        this.months?.push(zero + index);
      } else {
        this.months?.push(index.toString());
      }
    }
  }

  ngOnInit() {
    this.forUser();
    this.addressForm = new FormGroup({
      country: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      phoneNumber: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          this.customValidator.patternPhoneNumberValidator(),
        ])
      ),
    });
  }
  get addressFormControl() {
    return this.addressForm.controls;
  }

  forUser() {
    console.log('forUser in admin route just triggered!');
    this.userSerivce.forUser().subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
      },
      error: (error: any) => {
        console.log('Error when call forUser method :>> ', error);
        this.toastService.warning(
          'You have to login first, if your would like to use this feature!'
        );
      },
    });
  }

  onSubmitCard(): void {
    console.log('onSubmitCard');
    console.log('this.addCardForm:>> ', this.addCardForm.value);
    console.log('this.cardNumber :>> ', this.cardNumber);
    console.log('this.nameOnCard :>> ', this.nameOnCard);
    console.log(
      'this.expirationMonthActiveNumber :>> ',
      this.expirationMonthActiveNumber
    );
    console.log(
      'this.expirationYearActiveNumber :>> ',
      this.expirationYearActiveNumber
    );
    if (this.addCardForm.valid) {
      // Send request to server
    } else {
      // No Send request to server
    }
  }

  handleClickExiprationMonth(month: string): void {
    console.log('handleClickExiprationMonth');
    console.log('month :>> ', month);
    this.expirationMonthActiveNumber = month;
  }

  handleClickExiprationYear(year: number): void {
    console.log('handleClickExiprationYear');
    console.log('month :>> ', year);
    this.expirationYearActiveNumber = year;
  }

  handleClickOverlay(): void {
    console.log('handleClickOverlay');
    this.isShowAddAddressWindow = false;
    this.isShowAddCardWindow = false;
  }

  handleAddCreditOrDebitCard(): void {
    console.log('handleAddCreditOrDebitCard');
    this.isShowAddCardWindow = true;
  }

  onSubmitFormAddAdress(addressFormData: Address): void {
    console.log('onSubmitFormAddAdress');
    console.log('addressFormData :>> ', addressFormData);
    const address: Address = {
      streetAddress: addressFormData.streetAddress,
      city: addressFormData.city,
      state: addressFormData.state,
      zipcode: addressFormData.zipcode,
      phoneNumber: addressFormData.phoneNumber,
    };

    console.log('address :>> ', address);
  }

  handleAddAddress(): void {
    this.isShowAddAddressWindow = true;
  }

  handleCloseCardWindow(): void {
    this.isShowAddCardWindow = false;
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
