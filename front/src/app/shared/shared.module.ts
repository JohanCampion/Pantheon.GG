import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { SimpleButtonComponent } from './simple-button/simple-button.component';



@NgModule({
    declarations: [
        MenuButtonComponent,
        SimpleButtonComponent
    ],
    exports: [
        MenuButtonComponent,
        SimpleButtonComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
