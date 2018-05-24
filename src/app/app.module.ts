import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { Logger } from "./shared/logger.service";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";

import { ComponentsModule } from "./components";
import { DocsModule } from "./docs/docs.module";
import { NewsModule } from "./news/news.module";
import { GuidesModule } from "./guides/guides.module";
import { WizardModule } from "./wizard/wizard.module";

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		ComponentsModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		WizardModule,
		DocsModule,
		NewsModule,
		GuidesModule,
	],
	declarations: [
		AppComponent,
		FooterComponent,
		HeaderComponent,
		AboutComponent,
		HomeComponent
	],
	providers: [
		Logger
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
