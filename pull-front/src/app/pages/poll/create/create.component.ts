import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PollService } from 'src/app/services/poll.service';

export interface Option {
  name: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})
export class CreateComponent implements OnInit {

  requiredField = "Required field.";
  totalQuestions: string[] = [];
  constructor(private service: PollService) { }

  titleForm = new FormGroup({
    title: new FormControl(null, {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    })
  });
  questionsForm = new FormGroup({
    questions: new FormControl([], {
      validators: [
        Validators.required,
      ],
      updateOn: 'change',
    })
  });

  get titleFormControl() {
    return this.titleForm?.get('title');
  }

  get questionsFormControl() {
    return this.questionsForm?.get('questions');
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  options: Option[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Option
    if (value) {
      this.options.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(option: Option): void {
    const index = this.options.indexOf(option);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }
  ngOnInit(): void {
  }
  cleanData() {
    // this.equipmentDataGridService.cleanData();
  }
  addQuestion() {
    // this.equipmentDataGridService.cleanData();
    this.totalQuestions.push(this.questionsFormControl?.value);
    this.questionsForm.reset();
    console.warn("que tiene el puto este", this.totalQuestions)
  }

  removeQuestion() {
    // this.equipmentDataGridService.cleanData();
    this.totalQuestions.pop();
    this.questionsForm.reset();
  }

  finalStep() {
    this.totalQuestions = this.questionsForm.value.length;
  }
  create(): void {
    if (this.titleForm.valid) {
      this.service.createPoll({
        'question': this.titleFormControl?.value as string,
        'options': this.options,
        'cant_options': this.options.length,
        'total_participants': 0
      }, "poll").subscribe({
        next: (result: any) => {
          console.warn("resulto bien", result)
        },
        error: (err: any) => {

        }
      }

      )
    }
    /* if (this.generalDataFormGroup.valid) {
       this.equipmentDataGridService.dataToPass.forEach((value, index) => {
         this.content.push({
           equipmentId: value.equipment,
           quantity: value.quantity,
         });
       });
       this.service
         .create(
           {
             totalEquipmentHours: this.totalManHours,
             resourceCreateInput: {
               code: this.generalDataFormGroup.controls['code'].value as string,
               description: this.generalDataFormGroup.controls['description']
                 .value as string,
               price: 0,
               unitOfMeasurementId: this.generalDataFormGroup.controls['uom']
                 .value as string,
             },
           },
           this.content
         )
         .subscribe(
           (data) => {
             this.cleanData();
             this.snakBarService.openSnackBar(fieldWasCreated, 'Cerrar');
           },
           (error) => {
             this.snakBarService.openSnackBar(
               fieldWasCreatedError,
               'Cerrar',
               {},
               'error'
             );
           }
         );
     }*/
  }
}
