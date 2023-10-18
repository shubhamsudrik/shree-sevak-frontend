import { Component, Input } from "@angular/core";

@Component({
  selector: "hello",
  template: `<h1>Hello {{ name }}!</h1>`,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class HelloComponent {
  @Input() name: string;

  // formInitilizer(residence: any, current: any) {
  //   this.addressDetailsForm = this.formBuilder.group({
  //     selectAllCheck: [this.checkboxService.getValue(this.checkboxPersonalKey)],
  //     residenceDetails: this.formBuilder.array([
  //       this.formBuilder.group({
  //         name: ["Address Line 1"],
  //         textfiled: [{ value: residence.address1, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Address Line 2"],
  //         textfiled: [{ value: residence.address2, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Address Line 3"],
  //         textfiled: [{ value: residence.address3, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["City"],
  //         textfiled: [{ value: residence.city, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["District"],
  //         textfiled: [{ value: residence.district, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["State"],
  //         textfiled: [{ value: residence.state, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Pincode"],
  //         textfiled: [{ value: residence.pincode, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Contact Number"],
  //         textfiled: [{ value: residence.contactNo, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Landmark"],
  //         textfiled: [{ value: residence.landmark, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //     ]),
  //     currentDetails: this.formBuilder.array([
  //       this.formBuilder.group({
  //         name: ["Address Line 1"],
  //         textfiled: [{ value: current.address1, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Address Line 2"],
  //         textfiled: [{ value: current.address2, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Address Line 3"],
  //         textfiled: [{ value: current.address3, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["City"],
  //         textfiled: [{ value: current.city, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["District"],
  //         textfiled: [{ value: current.district, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["State"],
  //         textfiled: [{ value: current.state, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Pincode"],
  //         textfiled: [{ value: current.pincode, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Contact Number"],
  //         textfiled: [{ value: current.contactNo, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //       this.formBuilder.group({
  //         name: ["Landmark"],
  //         textfiled: [{ value: current.landmark, disabled: true }],
  //         checkbox: [false],
  //         remark: [null],
  //       }),
  //     ]),
  //   });
  // }
  // get currentAddressArray() {
  //   return this.addressDetailsForm.controls["currentDetails"] as FormArray;
  // }
  // get residenceAddressArray() {
  //   return this.addressDetailsForm.controls["residenceDetails"] as FormArray;
  // }

  
}
