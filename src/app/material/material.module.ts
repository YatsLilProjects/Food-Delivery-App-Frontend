import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule} from '@angular/material/badge';
import { MatGridListModule} from '@angular/material/grid-list';

const MaterialComponents=[
  MatDialogModule,
  MatIconModule,
  MatBadgeModule,
  MatGridListModule
];

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
