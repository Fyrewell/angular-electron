import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdToolbarModule, MdListModule, MdTabsModule} from '@angular/material';

@NgModule({
    imports: [
      BrowserAnimationsModule,
      MdToolbarModule,
      MdListModule,
      MdTabsModule
    ],
    exports: [],
    declarations: [
    ],
    providers: [],
})
export class LogsModule { }
