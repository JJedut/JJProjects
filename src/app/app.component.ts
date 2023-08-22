import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  input1Value: string = '';
  input2Value: string = '';
  areInputsFilled: boolean = false;
  title = 'New'

  blue: string = '#5465ff';
  red: string = '#ef233c';
  error: string[] = [];
  flag: boolean = true;

  check(password: string): boolean {

    var errors: string[] = [];

    if(!password) {
      return false;
    }

    const uppercaseRegex = /[A-Z]/;
    const specialSymbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const numberRegex = /[0-9]/;

    const hasUppercase = uppercaseRegex.test(password);
    if(!hasUppercase) {
      errors.push('Must contain atleast 1 capital letter');
    }
    const hasSpecialSymbol = specialSymbolRegex.test(password);
    if(!hasSpecialSymbol) {
      errors.push('Must contain atleast 1 special character');
    }
    const hasNumber = numberRegex.test(password);
    if(!hasNumber) {
      errors.push('Must contain atleast 1 number');
    }
    const hasMin = password.length >= 8;
    if(!hasMin) {
      errors.push('Must be atleast 8 characters long');
    }

    this.error = errors;
    this.flag = hasUppercase && hasSpecialSymbol && hasNumber && hasMin;

    return hasUppercase && hasSpecialSymbol && hasNumber && hasMin;
  }

  checkInputs() {
    this.areInputsFilled = !(this.input1Value.length===0) && this.check(this.input2Value);
  }

  submitForm() {
    if (this.areInputsFilled) {
      console.log('Form submitted:', this.input1Value, this.input2Value);

      interface JSONData {
        login: string;
        password: string;
      }
    
      const JSONDatas: JSONData[] = [
        {"login": this.input1Value, "password": this.input2Value}
      ];
    
      localStorage.setItem("datas", JSON.stringify(JSONDatas));
    
    }
  }

}
