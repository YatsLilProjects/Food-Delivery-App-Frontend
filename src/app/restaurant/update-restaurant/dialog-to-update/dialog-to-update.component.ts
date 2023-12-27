import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/model/Restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-to-update',
  templateUrl: './dialog-to-update.component.html',
  styleUrls: ['./dialog-to-update.component.css']
})
export class DialogToUpdateComponent {
  restaurantId: number;
  errorMessage: string[] = [];

  constructor(private restaurantService: RestaurantService,
    private route: Router,
    private dialogRef: MatDialogRef<DialogToUpdateComponent>) { }

  RouteToUpdate() {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: response => {
        this.route.navigate(['update-restaurant',response.responseData.restaurantId]);
        this.dialogRef.close();
      },
      error: error => {
        this.errorMessage = error.error.errMessage;
        const arrayAsErrors = this.errorMessage.join(',');
        Swal.fire({
          title: 'Sorry! Could Not Fetch Details.',
          html: `<div style="color: brown; font-size: 16px;">
          ${arrayAsErrors}
          <span class="material-symbols-outlined" style="vertical-align: middle">
          sentiment_dissatisfied
          </span>
          </div>`,
          icon: 'error',
        });
        this.dialogRef.close();
      }
    })
  }


}
