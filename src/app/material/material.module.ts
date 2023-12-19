import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { MatBadgeModule} from '@angular/material/badge';

const MaterialComponents=[
  MatDialogModule,
  MatIconModule,
  MatBadgeModule
];

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
