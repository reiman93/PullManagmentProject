import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrls: ['./make.component.scss']
})
export class MakeComponent implements OnInit {
  id: any;
  poll: any;
  percent: any[] = [];
  options: any[] = [];

  constructor(
    private service: PollService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.findById()
  }

  findById() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getById("poll", this.id).subscribe((result: any) => {
      console.warn("Este es el resultado", result)
      this.poll = result
      this.service.getOptsById("options", this.id).subscribe({
        next: (res: any) => {
          this.options = res;
        },
        error: (err: any) => {

        }
      })
    });
  }

  returnToList(): void {
    this.location.back();
  }

  selectOption(event: any, id: any) {
    console.warn("opion seleccionada", id)
    this.service.markPoll({
      id: this.id,
      id_option: id,
      user_id: JSON.parse(sessionStorage.getItem('currentUser')!).username,
    }, "poll_mark").subscribe({
      next: (res: any) => {
        console.warn("Este es el resultado options", res)
        this.service.getPerOpts("poll_result/" + this.id).subscribe({
          next: (res: any) => {
            console.warn("Llega los porcientos", res)
            this.percent = res;
          },
          error: (err: any) => {

          }
        })
      },
      error: (err: any) => {

      }
    })

  }

}
