import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Http } from '@angular/http';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { GuideDataService } from './guide-data.service';

@Component({
	selector: "guides",
	templateUrl: "./guides.component.html",
	styleUrls: ["./guides.component.scss"]
})
export class GuidesComponent implements OnInit, OnDestroy {

	constructor(
		private route: ActivatedRoute,
		private http: Http,
		private guideService: GuideDataService
	) {
	}

	ngOnDestroy() {
	}

	actionsText: string = '';
	buffer: any[];
	guides: any[];

	ngOnInit(): void {
		this.guideService.ready().then(() => {
			let guidesConfig = this.guideService.getGuides();
			this.guides = [];

			for (let guide of guidesConfig) {
				this.guides.push(
					{
						title: guide.title,
						type: guide.type,
						description: guide.description,
						tags: this.guideService.getGuideTags(guide),
						action: {
							label: this.guideService.getGuideLabel(guide),
							url: this.guideService.getGuideURL(guide),
							docurl: guide.documentation ? guide.documentation.trim() : null,
							iconClass: 'fa fa-' + this.guideService.getGuideIcon(guide)
						}
					});
			}

			console.log(this.guides);

			this.filterGuides();
		});
	}

	filterGuides(filter = "") {
		if (filter && filter.trim().length > 0) {
			let keywords = filter.toLowerCase().split(/\s+/gi);
			this.buffer = this.guides.filter((guide: any) => {
				for (let k of keywords) {
					if (!((guide.description && (guide.description + "").toLowerCase().indexOf(k) >= 0)
						|| (guide.title && (guide.title + "").toLowerCase().indexOf(k) >= 0)
						|| (guide.tags && (guide.tags + "").toLowerCase().indexOf(k) >= 0)
						|| (guide.keywords && (guide.keywords + "").toLowerCase().indexOf(k) >= 0)
					)) {
						return false;
					}
				}
				return true;
			});
		} else {
			this.buffer = this.guides;
		}
	}

}
