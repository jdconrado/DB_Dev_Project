import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  show = false;
  constructor() { }

  ngOnInit() {
  }
  myFunction(event) {
    console.log(event);
    console.log(event.srcElement.addEventListener.name);
    console.log(event.srcElement.value)
    if (event.srcElement.value === 'cliente') {
      this.show = false;
    }
    if (event.srcElement.value === 'vendedor') {
      this.show = true;
    }

  }

}
