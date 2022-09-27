import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { LoguinServiceService } from 'src/app/services/auth/loguin-service.service';
import { SnakBarService } from 'src/app/components/snack-bar/snak-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageSrc: string = "assets/img/user.png";
  name!: string;
  email!: string;
  phone!: number;
  rol!: string;
  rolData!: any;
  dataDepartment!: any;

  requiredField: string = "Required field.";
  confirmField: string = "Passwords must match";
  phoneNumbres: string = "Incorrect phone number";

  user !: string;
  pass !: string;
  title !: string;
  method !: string;
  btnLabel!: string;

  /*@ViewChild('regist')
  regist!: ElementRef;*/

  myForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    last_name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
    }),
    pass: new FormControl('', {
      validators: [
        this.matchValidator('passConfirm', true)
      ],
      updateOn: 'change',
    }),
    passConfirm: new FormControl('', {
      validators: [
        this.matchValidator('pass')
      ],
      updateOn: 'change',
    }),
    username: new FormControl('', {
      updateOn: 'change',
    }),
  });

  constructor(
    private service: LoguinServiceService,
    public fb: FormBuilder,
    private snakBarService: SnakBarService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  get nameControl() {
    return this.myForm.get('name');
  }
  get lastControl() {
    return this.myForm.get('last_name');
  }
  get usernameControl() {
    return this.myForm.get('username');
  }

  get emailControl() {
    return this.myForm.get('email');
  }
  get phoneControl() {
    return this.myForm.get('phone');
  }


  get passControl() {
    return this.myForm.get('pass');
  }
  get passConfirmControl() {
    return this.myForm.get('passConfirm');
  }

  clearForm() {
    this.myForm.reset();
  }

  returnToList() {
    this.router.navigateByUrl('pages');
}
  submitForm(): void {
    if (this.myForm.valid) {
      this.service.updateUser({
        username:this.usernameControl?.value as string,
        first_name: this.nameControl?.value as string,
        last_name: this.lastControl?.value as string,
        email: this.emailControl?.value as string,
        password: this.passControl?.value as string,
        password2: this.passConfirmControl?.value as string,
      },"register/").subscribe({
        next: (result: any) => {
            this.snakBarService.openSnackBar('Successfully created', 'Close');
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error creating data.',
            'Close',
            {},
            'error'
          );
        },
        complete: () => { }
      });
    }
  }

  matchValidator(
    matchTo: string,
    reverse?: boolean
  ): ValidatorFn {
    return (control: AbstractControl):
      ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value ===
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
