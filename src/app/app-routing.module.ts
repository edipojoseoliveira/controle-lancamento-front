import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { GatilhoMentalComponent } from './alicerce/gatilho-mental/gatilho-mental.component';
import { JornadaComponent } from './alicerce/jornada/jornada.component';
import { PrincipioComponent } from './alicerce/principio/principio.component';
import { ObstaculoComponent } from './alicerce/obstaculo/obstaculo.component';
import { TipoLancamentoComponent } from './alicerce/tipo-lancamento/tipo-lancamento.component';
import { FaixaComponent } from './alicerce/faixa/faixa.component';
import { MetodoComponent } from './alicerce/metodo/metodo.component';
import { QuestionarioRaioXComponent } from './alicerce/questionario-raio-x/questionario-raio-x.component';
import { NichoComponent } from './alicerce/nicho/nicho.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: 'gatilho-mental', component: GatilhoMentalComponent },
                    { path: 'jornada', component: JornadaComponent },
                    { path: 'principio', component: PrincipioComponent },
                    { path: 'obstaculo', component: ObstaculoComponent },
                    { path: 'tipo-lancamento', component: TipoLancamentoComponent },
                    { path: 'faixa', component: FaixaComponent },
                    { path: 'metodo', component: MetodoComponent },
                    { path: 'questionario-raio-x', component: QuestionarioRaioXComponent },
                    { path: 'nicho', component: NichoComponent },
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                ],
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
