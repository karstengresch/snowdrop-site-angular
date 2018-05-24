import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Http } from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import { RegistryService } from "../components";

@Component({
	selector: "news-component",
	templateUrl: "./news.component.html",
	styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit, OnDestroy {

	constructor(
		private registryService: RegistryService,
		private route: ActivatedRoute,
		private http: Http,
	) {
		this.route.fragment.subscribe((value) => {
			this.ready().then(() => {
				setTimeout(() => {
					let matches = Array.from(document.querySelectorAll(`a[href="#${value}"]`));
					if (matches) {
						let scrolled = false;
						matches.forEach((element) => {
							if (!scrolled) {
								scrolled = true;
								element.scrollIntoView({
									behavior: "smooth",
									block: "start",
								});
							}
						});
					}
				}, 150);
			});
		});
	}

	ngOnDestroy() {
	}

	source: string = "Loading...";
	private _ready: Promise<any> = null;

	ngOnInit(): void {
		this.ready();
	}

	private ready() {
		if (!this._ready) {
			this._ready = new Promise((resolve, reject) => {
				this.route.paramMap.subscribe((params) => {
					return this.registryService.getRegistry().then((registry) => {
						let newsUrl = registry.news.url;
						return this.http.get(newsUrl).toPromise().then((res) => {
							this.source = res.text();
							resolve();
						});
					}).catch((err) => {
						reject(err);
					});
				});
			})
		}
		return this._ready;
	}

}
