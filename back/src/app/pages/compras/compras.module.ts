import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdToolbarModule, MdListModule, MdButtonModule} from '@angular/material';

@NgModule({
    imports: [
      BrowserAnimationsModule,
      MdToolbarModule,
      MdButtonModule,
      MdListModule
    ],
    exports: [],
    declarations: [
    ],
    providers: [],
})
export class ComprasModule { }
