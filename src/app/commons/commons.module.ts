import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BodyComponent } from './body/body.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { PopoverService } from './services/popover.service';
import { OptionsComponent } from './options/options.component';
import { DateRangeComponent } from './date-range/date-range-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KPICardComponent } from './kpicard/kpicard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageComponent } from './page/page.component';
import { PaginatedListComponent } from './paginated-list/paginated-list.component';
// import { OrganisationComponent } from './organisation/organisation.component';
import { ModalService } from './services/modal-provider.service';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SortProviderService } from './services/sort.provider.service';
import { SortComponent } from './sort/sort.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { ProcessInstanceViewComponent } from './process-instance-view/process-instance-view.component';
import { ProcessFormViewComponent } from './process-form-view/process-form-view.component';
import { ExportComponent } from './export/export.component';
import { AuthCheckDirective } from './directives/auth-check/auth-check.directive';
// import { DownloadStatusComponent } from './download-status/download-status.component';
import { ListViewComponent } from './list-view/list-view.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImportDataComponent } from './import-data/import-data.component';
import { ModalComponent } from './modal/modal.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

@NgModule({
    declarations: [
        BodyComponent,
        OptionsComponent,
        DateRangeComponent,
        KPICardComponent,
        UserProfileComponent,
        PageComponent,
        OrganisationComponent,
        PaginatedListComponent,
        MultiSelectComponent,
        SortComponent,
        ProcessFormComponent,
        ReportViewComponent,
        ProcessInstanceViewComponent,
        ProcessFormViewComponent,
        ExportComponent,
        AuthCheckDirective,
        // DownloadStatusComponent,
        ListViewComponent,
        FileUploadComponent,
        ImportDataComponent,
        ModalComponent,
        ImageGalleryComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatFormFieldModule

    ],
    entryComponents: [
        OptionsComponent,
        SortComponent,
        ProcessFormComponent,
        ReportViewComponent,
        ProcessInstanceViewComponent,
        ProcessFormViewComponent,
        FileUploadComponent
    ],
    exports: [
        BodyComponent,
        OptionsComponent,
        DateRangeComponent,
        MatDatepickerModule,
        MatFormFieldModule,
        KPICardComponent,
        UserProfileComponent,
        PageComponent,
        OrganisationComponent,
        PaginatedListComponent,
        MultiSelectComponent,
        ProcessFormComponent,
        ReportViewComponent,
        ProcessInstanceViewComponent,
        ProcessFormViewComponent,
        ExportComponent,
        AuthCheckDirective,
        // DownloadStatusComponent,
        ListViewComponent,
        FileUploadComponent,
        ImportDataComponent,
        ModalComponent
    ],
    providers: [
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter },
        PopoverService,
        ModalService,
        SortProviderService
    ]
})
export class AppCommonModule { }
