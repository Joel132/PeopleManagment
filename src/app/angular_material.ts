import { MatCheckboxModule,MatInputModule,
  MatButtonModule,
  MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule,MatInputModule,
    MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule],
})
export class MaterialModule { }
