import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({ providedIn: 'root' })
export class SnakBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    message = '',
    action: string,
    config: MatSnackBarConfig<TextOnlySnackBar> = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    },
    severity: 'basic' | 'success' | 'info' | 'warning' | 'error' = 'success',
    closeButton = false
  ): void {
    if (config) {
      config.duration = config.duration
        ? config.duration
        : message.length > 300
        ? message.length * 100
        : 3000;
      config.horizontalPosition = config.horizontalPosition
        ? config.horizontalPosition
        : 'right';
      config.verticalPosition = config.verticalPosition
        ? config.verticalPosition
        : 'top';
    }
    config.panelClass = ['snackbar', `${severity}-snackbar`];
    // ICON SELECTION
    const iconMap = {
      basic: '',
      success: 'task_alt_outlined',
      info: 'info_outlined',
      warning: 'warning_outlined',
      error: 'error_outlined',
    };
    // this.snackBar.open(message, action, config);
    this.snackBar.openFromComponent(SnackBarComponent, {
      ...config,
      data: {
        message: message,
        icon: iconMap[severity],
        closeButton: closeButton,
      },
    });
  }
}
