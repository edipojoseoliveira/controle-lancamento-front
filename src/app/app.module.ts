import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { GatilhoMentalComponent } from './alicerce/gatilho-mental/gatilho-mental.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TimelineModule } from 'primeng/timeline';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { JornadaComponent } from './alicerce/jornada/jornada.component';
import { PrincipioComponent } from './alicerce/principio/principio.component';
import { ObstaculoComponent } from './alicerce/obstaculo/obstaculo.component';
import { TipoLancamentoComponent } from './alicerce/tipo-lancamento/tipo-lancamento.component';
import { FaixaComponent } from './alicerce/faixa/faixa.component';
import { MetodoComponent } from './alicerce/metodo/metodo.component';
import { QuestionarioRaioXComponent } from './alicerce/questionario-raio-x/questionario-raio-x.component';
import { NichoComponent } from './alicerce/nicho/nicho.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        GatilhoMentalComponent,
        JornadaComponent,
        PrincipioComponent,
        ObstaculoComponent,
        TipoLancamentoComponent,
        FaixaComponent,
        MetodoComponent,
        QuestionarioRaioXComponent,
        NichoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        InputTextareaModule,
        ConfirmDialogModule,
        TimelineModule,
        HttpClientModule,
        FieldsetModule,
        DialogModule,
        CheckboxModule,
        TreeModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, HttpErrorHandler, MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
