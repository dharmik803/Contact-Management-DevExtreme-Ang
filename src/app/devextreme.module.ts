import { NgModule } from "@angular/core";
import { DxButtonGroupModule, DxButtonModule } from 'devextreme-angular';
import { DxMenuModule } from "devextreme-angular";
import { DxDataGridModule, DxFormModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
    exports : [
        DxButtonModule,
        DxMenuModule,
        DxDataGridModule,
        DxFormModule,
        DxPopupModule,
        DxButtonGroupModule
    ]
})

export class DevExtremeModule {}
