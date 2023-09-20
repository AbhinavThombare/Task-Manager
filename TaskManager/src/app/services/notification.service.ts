import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  horizontal : MatSnackBarHorizontalPosition = 'right';
  veritcal : MatSnackBarVerticalPosition = 'top'
  constructor(private _snackBar: MatSnackBar) { }

  openSuccessBar(...message:any) {
    this._snackBar.open(message,'' ,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
      panelClass: ['successbar'],
    });   
  }
  dataAddedSuccess(...message:any) {
    this._snackBar.open(message,'',{
      horizontalPosition: this.horizontal,
      verticalPosition: this.veritcal,
      duration: 4000,
      panelClass: ['successbar'],
    });   
  }

  openErrorBar(...message:any) {
    this._snackBar.open(message,'' ,{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
      panelClass: ['errorbar'],
    });   
  }
}
