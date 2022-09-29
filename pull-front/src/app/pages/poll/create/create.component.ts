import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { PollService } from 'src/app/services/poll.service';
import { SnakBarService } from 'src/app/components/snack-bar/snak-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  id: any;
  Title: any;
  constructor(
    private service: PollService,
    private snakBarService: SnakBarService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

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
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.Title = "Edit Poll"
      this.findById(this.id)
    } else {
      this.Title = "Create Poll"
    }
  }

  returnToList(): void {
    this.location.back();
  }

  findById(id: any) {
    this.service.getById("poll", id).subscribe((result: any) => {
      console.warn("Este es el resultado", result)
      this.titleForm.patchValue({
        title: result.question,
      });
      this.service.getOptsById("options", id).subscribe({
        next: (res: any) => {
          this.options = res;
        },
        error: (err: any) => {

        }
      })
    });
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
      if (this.id) {
        this.service.editPoll({
          'question': this.titleFormControl?.value as string,
          'options': this.options,
          'cant_options': this.options.length,
          'user_id': JSON.parse(sessionStorage.getItem('currentUser')!).username,
          'total_participants': 0
        }, "poll/" + this.id + "/").subscribe({
          next: (result: any) => {
            console.warn("resulto bien", result)
            this.snakBarService.openSnackBar('Successfully edited', 'Close');
            this.router.navigate(['pages/poll/list']);
          },
          error: (err: any) => {

          }
        }
        )
      } else {
        this.service.createPoll({
          'question': this.titleFormControl?.value as string,
          'options': this.options,
          'cant_options': this.options.length,
          'user_id': JSON.parse(sessionStorage.getItem('currentUser')!).username,
          'total_participants': 0
        }, "poll").subscribe({
          next: (result: any) => {
            console.warn("resulto bien", result)
            this.snakBarService.openSnackBar('Successfully created', 'Close');
            this.router.navigate(['pages/poll/list']);
          },
          error: (err: any) => {

          }
        }
        )
      }
    }
  }
}
