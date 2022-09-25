import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataGridService } from 'src/app/components/data-grid/component/service/data-grid.service';
import { LoguinServiceService } from 'src/app/services/auth/loguin-service.service';

import { DataGridComponent } from '../../../components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from '../../../components/dialog-basic/dialog-basic.component';
import { SnakBarService } from '../../../components/snack-bar/snak-bar.service';
//import { ConfigServiceService } from '../../../services/config-service.service';

import { INomenclators } from '../../../interfaces/entity-interfaces';
import { IObject } from '../../../interfaces/IObject';


@Component({
  selector: 'app-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Output() emitter = new EventEmitter<Array<unknown>>();
  @Input() hideOptions = false;
  @ViewChild('tabla')
  tabla!: DataGridComponent;

  @ViewChild('userL')
  userL!: ElementRef;

  data!: INomenclators[];
  slectedRows = true;
  result!: Array<any>;
  dataPlayers!: Array<any>;
  foto: string[] = [];

  constructor(
    public service: LoguinServiceService,
    private router: Router,
    private snakBarService: SnakBarService,
    public dialog: MatDialog,
    private dataGridService: DataGridService,
    //private serviceConf: ConfigServiceService,
  ) { }

  @Output()
  emitSelectedValues(event: Array<unknown>) {
    this.emitter.emit(event);
  }

  ngOnInit(): void {
    this.dataGridService.dataGrid.subscribe((result: any) => {
      result.forEach((value: any, index: any) => {
        this.foto[value.id] = value.foto ? value.foto : "assets/img/user.png";
      })
    });
  }

  /*emitComponentHeigth(data: number) {
    this.serviceConf.updateComponentHeigth(data);
  }*/
  ngAfterViewInit() {
    //  this.emitComponentHeigth(this.userL.nativeElement.clientHeight + 10);
    this.tabla.selection.changed.subscribe((data: any) => {
      this.slectedRows = data.source.selected.length === 0 ? true : false;
    });
  }

  register() {
    this.router.navigate(['pages/register/create', 'cre']);
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
        const ids = new Array<string>();
        this.tabla.selection.selected.forEach((value, index) => {
          ids.push(value as string);
        });
        if (this.tabla.selection.selected.length != 0) {
          this.service
            .deleteMany(ids, 'deleteManyUser')
            .pipe(
              catchError((err) => {
                this.snakBarService.openSnackBar(err, '');
                return of([]);
              })
            )
            .subscribe(() => {
              if (ids.length > 1) {
                this.snakBarService ?.openSnackBar(
                  'Los elementos seleccionados han sido eliminados satisfactoriamente',
                  ''
                );
              } else {
                this.snakBarService ?.openSnackBar(
                  'El elemento ha sido eliminado satisfactoriamente',
                  ''
                );
              }
              this.tabla ?.selection.clear();
              this.tabla.reloadData();
            });
        }
      }
    });
  }
}
