import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdToolbarModule, MdButtonModule, MdInputModule, MdSnackBarModule} from '@angular/material';

@NgModule({
    imports: [
      BrowserAnimationsModule,
      MdToolbarModule,
      MdButtonModule,
      MdSnackBarModule
    ],
    exports: [],
    declarations: [
    ],
    providers: [],
})
export class ProdutosDetalheModule { }
