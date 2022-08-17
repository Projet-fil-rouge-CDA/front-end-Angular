import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../shared/services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../shared/models/post";

@Component({
    selector: 'app-fils',
    templateUrl: './fils.component.html',
    styleUrls: ['./fils.component.scss']
})
export class FilsComponent implements OnInit {

    category: any;
    posts: any;

    constructor(private titleService: Title,
                private serviceForum: ForumService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .subscribe(params => {
                this.category = params.get('category');
            });

        this.titleService.setTitle('Univ\'Air | Forum - ' + this.category);

        this.serviceForum.getPosts().subscribe((posts: Post) => {
            this.posts = posts;
        })
    }
}
