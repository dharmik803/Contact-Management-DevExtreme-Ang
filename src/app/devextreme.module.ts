import { NgModule } from "@angular/core";
import { DxButtonGroupModule, DxButtonModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule } from 'devextreme-angular';
import { DxMenuModule } from "devextreme-angular";
import { DxDataGridModule, DxFormModule, DxPopupModule } from 'devextreme-angular';


@NgModule({
    exports : [
        DxButtonModule,
        DxMenuModule,
        DxDataGridModule,
        DxFormModule,
        DxPopupModule,
        DxButtonGroupModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxDateBoxModule
    ]
})

export class DevExtremeModule {}
