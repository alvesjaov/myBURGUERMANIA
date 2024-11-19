import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [RouterModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}