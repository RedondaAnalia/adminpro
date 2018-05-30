import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RouterModule } from "@angular/router";

import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumsComponent } from "./breadcrums/breadcrums.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        NopagefoundComponent,
        SidebarComponent,
        BreadcrumsComponent,
        HeaderComponent,
    ],
    exports: [
        NopagefoundComponent,
        SidebarComponent,
        BreadcrumsComponent,
        HeaderComponent,
    ]
})

export class SharedModule{}