import { NgModule } from "@angular/core";
import { DxButtonModule } from 'devextreme-angular';
import { DxMenuModule } from "devextreme-angular";
import { DxDataGridModule, DxFormModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
    exports : [
        DxButtonModule,
        DxMenuModule,
        DxDataGridModule,
        DxFormModule,
        DxPopupModule
    ]
})

export class DevExtremeModule {}
