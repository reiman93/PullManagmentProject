import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PollService } from 'src/app/services/poll.service';

import { DialogBasicComponent } from '../../../components/dialog-basic/dialog-basic.component';
import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'options'];
  dataSource: string[] = [];

  constructor(
    public service: PollService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.service.getAll('poll').subscribe({
      next: (result: any) => {
        console.warn("resultado de la tabla", result)
        this.dataSource = result;
      },
      error: (err: any) => {

      }
    })
  }

  ngAfterViewInit() {

  }

  make(id: any) {
    this.router.navigate(['pages/poll/make',id]);
  }
  update(id: string) {
    this.router.navigate(['pages/poll/edit', id]);
  }

  returnToList(): void {
    this.location.back();
  }

  deleteMany() {
    const dialogRef = this.dialog.open(DialogBasicComponent, {
      data: {
        value: 1,
        message:
          '¿Está seguro que desea eliminar el(los) elemento(s) seleccionado(s)?.',
      },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'accept') {

      }
    });
  }
}
