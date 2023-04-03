import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../shared/services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../shared/models/post";
import {MatDialog} from '@angular/material/dialog';
import {NewPostComponent} from "../forum-includes/new-post/new-post.component";

@Component({
    selector: 'app-fils', templateUrl: './fils.component.html', styleUrls: ['./fils.component.scss']
})
export class FilsComponent implements OnInit {

    category: any;
    posts: any;
    categoryID: string | null;

    postLoaded = false;

    constructor(private titleService: Title, private serviceForum: ForumService, private route: ActivatedRoute, public dialog: MatDialog) {
    }

    async ngOnInit() {
        this.route.queryParamMap
            .subscribe(params => {
                this.category = params.get('category');
                this.categoryID = params.get('id');
            });

        console.log(this.categoryID)

        this.titleService.setTitle('Univ\'Air | Forum - ' + this.category);

        this.serviceForum.getPosts(this.category).subscribe((posts: Post) => {
            console.log(posts);
            this.posts = posts;
            this.postLoaded = true;
        })

        setTimeout(() => {
        console.log(this.posts)
        }, 1000)
    }

    ngAfterViewInit(): void {
        // @ts-ignore
        document.getElementById("skeletonLoader").style.display = "none";
    }

    openDialog() {
        const dialogRef = this.dialog.open(NewPostComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onDelete(id: any) {
        if (confirm('Voulez-vous vraiment supprimer ce post ?')) {
            this.serviceForum.deletePost(id).subscribe(() => {
                this.ngOnInit();
            })
        }
    }
}
