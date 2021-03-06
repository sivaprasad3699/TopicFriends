import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module'
import {AgmCoreModule} from '@agm/core'


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule,
  ],
  declarations: [],
  exports: [
    SharedModule,
    AgmCoreModule,
  ]
})
export class MapsSharedModule { }
