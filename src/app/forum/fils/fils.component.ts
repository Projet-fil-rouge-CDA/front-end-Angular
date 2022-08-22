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

    constructor(private titleService: Title, private serviceForum: ForumService, private route: ActivatedRoute, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .subscribe(params => {
                this.category = params.get('category');
            });

        this.titleService.setTitle('Univ\'Air | Forum - ' + this.category);

        this.serviceForum.getPosts(this.category).subscribe((posts: Post) => {
            console.log(posts);
            this.posts = posts;
        })
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
