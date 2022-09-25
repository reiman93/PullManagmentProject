
import { Router } from '@angular/router'
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
//import { ConfigServiceService } from '../../../services/config-service.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  requiredField: string = "Campo requerido";
  confirmField: string = "Las contraseñas deben coincidir";

  user !: string;
  pass !: string;

  @ViewChild('sing')
  sing!: ElementRef;

  myForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
    }),
    user: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
    }),
    pass: new FormControl('', {
      validators: [
        Validators.required,
        this.matchValidator('passConfirm', true)
      ],
      updateOn: 'change',
    }),
    passConfirm: new FormControl('', {
      validators: [
        Validators.required,
        this.matchValidator('pass')
      ],
      updateOn: 'change',
    }),
  });

  constructor(
    public fb: FormBuilder,
    private servicio: LoguinServiceService,
    private router: Router,
    // private serviceConf: ConfigServiceService,
  ) { }

  ngOnInit(): void {
  }
  /*emitComponentHeigth(data: number) {
    this.serviceConf.updateComponentHeigth(data);
  }
  ngAfterViewInit() {
    this.emitComponentHeigth(this.sing.nativeElement.clientHeight + 10);
  }*/
  get nameControl() {
    return this.myForm.get('name');
  }
  get emailControl() {
    return this.myForm.get('email');
  }
  get userControl() {
    return this.myForm.get('user');
  }
  get passControl() {
    return this.myForm.get('pass');
  }
  get passConfirmControl() {
    return this.myForm.get('passConfirm');
  }

  returnToList() {
    this.router.navigateByUrl('pages');
  }

  submitForm(): void {
    if (this.myForm.valid) {
      this.returnToList();
      this.servicio.registryUser(this.myForm.value, 'get')
        .subscribe(
          (data: any) => {
            this.returnToList();
          },
          (error: any) => {
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
        const c = (control.parent ?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value ===
        (control.parent ?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
  }
}
