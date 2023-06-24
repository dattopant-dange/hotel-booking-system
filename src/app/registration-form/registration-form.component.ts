import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  customerName!: string;
  checkInDate!: string;
  totalNoOfDays!: number;
  totalNoOfPersons!: number;
  amenityAC: boolean = false;
  amenityLocker: boolean = false;
  roomType!: string;
  advanceAmount!: number;

  roomRate!: number;
  amenitiesCost!: number;
  totalAmenitiesCost!: number;

  storedFormList: any[] = [];

  ngOnInit() {
    const storedFormListString = localStorage.getItem('formList');
    if (storedFormListString) {
      this.storedFormList = JSON.parse(storedFormListString);
    }
  }

  onSubmit() {
    // Validate form inputs
    if (!this.customerName || !this.checkInDate || !this.totalNoOfDays || !this.totalNoOfPersons) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    // Calculate room rate based on room type
    if (this.roomType === 'Delux Room') {
      this.roomRate = 2500;
    } else if (this.roomType === 'Suite Room') {
      this.roomRate = 4000;
    }
    this.amenitiesCost = 0;
    if (this.amenityAC) {
      this.amenitiesCost += 1000;
    }
    if (this.amenityLocker) {
      this.amenitiesCost += 300;
    }

    // Calculate total cost
    const totalRoomCost = this.roomRate * this.totalNoOfDays;
    const totalAmenitiesCost = this.amenitiesCost * this.totalNoOfDays;
    let totalCost = totalRoomCost + totalAmenitiesCost;

    // Calculate additional person cost
    if (this.totalNoOfPersons > 2) {
      const additionalPersons = this.totalNoOfPersons - 2;
      const additionalPersonCost = additionalPersons * 1000 * this.totalNoOfDays;
      totalCost += additionalPersonCost;
    }

    // Calculate balance amount
    const balance = totalCost - this.advanceAmount;

    // Store form data in local storage
    const formData = {
      customerName: this.customerName,
      checkInDate: this.checkInDate,
      totalNoOfDays: this.totalNoOfDays,
      totalNoOfPersons: this.totalNoOfPersons,
      roomType: this.roomType,
      amenityAC: this.amenityAC,
      amenityLocker: this.amenityLocker,
      advanceAmount: this.advanceAmount,
      roomRate: this.roomRate,
      amenitiesCost: this.totalAmenitiesCost,
      totalCost: totalCost,
      balance: balance,
    };
    this.storedFormList.push(formData);

    // Clear form fields after submission
    this.customerName = '';
    this.checkInDate = '';
    this.totalNoOfDays = 0;
    this.amenityAC = false;
    this.amenityLocker = false;
    this.totalNoOfPersons = 0;
    this.roomType = '';
    this.advanceAmount=0;

    // Get existing form data from local storage (if any)
    const storedFormDataString = localStorage.getItem('formList');
    let storedFormData = [];
    if (storedFormDataString) {
      // console.log(formData)
      storedFormData = JSON.parse(storedFormDataString);
    }

    // Add current form data to the list
    storedFormData.push(formData);

    // Save the updated form data list in local storage
    localStorage.setItem('formList', JSON.stringify(storedFormData));
  }

  removeStoredData(index: number) {
    this.storedFormList.splice(index, 1);
    localStorage.setItem('formList', JSON.stringify(this.storedFormList));
  }

}
