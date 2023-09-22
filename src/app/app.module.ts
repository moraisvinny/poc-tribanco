import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { ResultadoDialogComponent } from './resultado-dialog/resultado-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


registerLocaleData(localePt);
@NgModule({
  declarations: [AppComponent, HelpDialogComponent, ResultadoDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
