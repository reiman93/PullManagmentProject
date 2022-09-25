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
  param !: string;
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
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
    }),
    phone: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ],
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
    rols_id: new FormControl('', {
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
  ) { }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('param')!;
    if (this.param == "prof") {
      this.title = "User profile";
      this.method = "updateUser";
      this.btnLabel = "Edit";
      this.findById();
    } else {
      this.title = "Create user";
      this.method = "registerUser";
      this.imageSrc = "assets/img/user.png";
      this.myForm.controls['pass'].setValidators([Validators.required, this.matchValidator('pass')]);
      this.myForm.controls['passConfirm'].setValidators([Validators.required, this.matchValidator('pass')]);
      this.myForm.controls['rols_id'].setValidators([Validators.required]);
      this.myForm.controls['username'].setValidators([Validators.required]);
      this.btnLabel = "Add";
      this.getAllRols();
    }
  }

  /* emitComponentHeigth(data: number) {
     this.serviceConfig.updateComponentHeigth(data);
   }
   ngAfterViewInit() {
     this.emitComponentHeigth(this.regist.nativeElement.clientHeight + 10);
   }*/
  get nameControl() {
    return this.myForm.get('name');
  }
  get usernameControl() {
    return this.myForm.get('username');
  }
  get rolControl() {
    return this.myForm.get('rols_id');
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

  findById() {
    this.service.getUser(JSON.parse(sessionStorage.getItem('currentUser')!).username, 'getUser').subscribe((result: any) => {
      let formData = result.data[0];
      console.warn("formData", formData)
      this.name = formData.name;
      this.email = formData.email;
      this.phone = formData.phone;
      this.rol = formData.rols.name;
      this.imageSrc = formData.foto ? formData.foto : "assets/img/user.png";

      this.myForm.patchValue({
        name: formData.name,
        email: formData.email,
        phone: formData.phone_number
      });
    });
  }

  getAllRols() {
    this.service.getAllRols('rol')
      .subscribe({
        next: (data: any) => {
          this.rolData = data.data;
        },
        error: (error: any) => {
          this.snakBarService.openSnackBar(
            'Error al obtener los datos de rol.',
            'cerrar',
            {},
            'error'
          )
        },
        complete: () => { }
      }
      );
  }

  clearForm() {
    this.myForm.reset();
  }
  submitForm(): void {
    if (this.myForm.valid) {
      this.service.updateUser({
        username: (this.param == "prof") ? JSON.parse(sessionStorage.getItem('currentUser')!).username : this.usernameControl?.value as string,
        name: this.nameControl?.value as string,
        email: this.emailControl?.value as string,
        phone: this.phoneControl?.value as number,
        password: this.passControl?.value as string,
        foto: this.imageSrc as string,
        rols_id: this.rolControl?.value as number,
      }, this.method).subscribe({
        next: (result: any) => {
          if (this.param == "prof") {
            this.snakBarService.openSnackBar('Successfully edited', 'Close');
            let current = JSON.parse(sessionStorage.getItem('currentUser')!);

            current.foto = this.imageSrc;
            current.name = this.nameControl?.value;
            current.email = this.emailControl?.value;

            this.name = this.nameControl?.value;
            this.email = this.emailControl?.value;
            this.phone = this.phoneControl?.value;

            this.service.updateSessionStorage(current);
          } else {
            this.snakBarService.openSnackBar('Successfully created', 'Close');
          }
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

  onSelectFile(event: any) {
    Array.from(event.target.files).forEach(file => {
      //get Base64 string    
      this.getBase64(file, (res: any) => {
        this.imageSrc = res
        //  this.formData.append(file.name, res);
      })
    });
  }

  getBase64(file: any, callBack: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callBack(reader.result);
    };
    reader.onerror = (error) => {
      callBack(null);
      //  this.snackbar.open('Error', "error", { duration: 5000 });
    };
  }
}
