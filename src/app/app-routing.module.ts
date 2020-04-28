import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LanguageComponent } from './language/language.component';
import { PreTestComponent } from './pre-test/pre-test.component';
import { QuestionsComponent } from './questions/questions.component';
import { FaqComponent } from './faq/faq.component';
import { QrComponent } from './qr/qr.component';
import { EmergencyComponent } from './emergency/emergency.component';
import { ViewQrComponent } from './view-qr/view-qr.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'language',
		component: LanguageComponent
	},
	{
		path: 'pre-test',
		component: PreTestComponent,
	},
	{
		path: 'questions',
		component: QuestionsComponent,
	},
	{
		path: 'faq',
		component: FaqComponent,
	},
	{
		path: 'qr',
		component: QrComponent,
	},
	{
		path: 'emergency',
		component: EmergencyComponent
	},
	{
		path: 'view/qr',
		component: ViewQrComponent,
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
