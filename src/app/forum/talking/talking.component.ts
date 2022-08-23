import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../shared/services/forum.service";
import {Post} from "../../shared/models/post";
import {Comment} from "../../shared/models/comment";
import {FormBuilder, FormGroup} from '@angular/forms';
import {Users} from "../../shared/models/users";
import {ImageViewerComponent} from "../forum-includes/image-viewer/image-viewer.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-talking', templateUrl: './talking.component.html', styleUrls: ['./talking.component.scss']
})
export class TalkingComponent implements OnInit {

    idPost: string | null;
    posts: any;
    comments: any = [];
    talkingForm: FormGroup;
    users: any[];
    category: any;

    constructor(private route: ActivatedRoute, private titleService: Title, private serviceForum: ForumService, private formBuilder: FormBuilder, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .subscribe(params => {
                this.idPost = params.get('post');
                this.category = params.get('category');
            });

        this.titleService.setTitle('Univ\'Air | Forum - Post - ' + this.idPost);

        this.serviceForum.getPosts(this.category).subscribe((posts: Post) => {
            this.posts = posts;
        })

        this.serviceForum.getComments(this.idPost).subscribe((comments: Comment) => {
            console.log(comments);
            for (const comment of comments.commentaires) {
                this.comments.push(comment);
            }
            console.log(this.comments);
        })

        this.serviceForum.getUsers().subscribe((users: any) => {
            this.users = users;
        })

        this.talkingForm = this.formBuilder.group({
            username: 'admin',
            message: '',
            date: new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}),
            id_post: this.idPost,
            id_user: '1',
            image: ''
        });
    }

    ngAfterViewInit(): void {
        window.onscroll = function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                // @ts-ignore
                document.getElementById("backTop").style.display = "block";
            } else {
                // @ts-ignore
                document.getElementById("backTop").style.display = "none";
            }
        }
    }

    onSubmit(): void {
        // this.serviceForum.uploadImage(this.talkingForm.value.image).subscribe((image: any) => {
        //     this.talkingForm.value.image = image.image;
        //     this.serviceForum.postComment(this.talkingForm.value).subscribe((comment: Comment) => {
        //         this.comments.push(comment);
        //         this.talkingForm.reset();
        //             this.ngOnInit();
        //     }
        //     )
        // })

        this.serviceForum.postComment(this.talkingForm.value).subscribe((comment: Comment) => {
            this.comments.push(comment);
            this.talkingForm.reset();
            this.ngOnInit();
        })
    }

    onDelete(id: any): void {
        this.serviceForum.deleteComment(id).subscribe((comment: Comment) => {
            this.comments = this.comments.filter((c: { id: string | undefined; }) => c.id !== comment.id);
            this.ngOnInit();
        })
    }

    //get user by id
    getUserById(id: any): any {
        return this.users.find((u: { id: string | undefined; }) => u.id === id);
    }

    onBan(id: any, commentId: any): void {
        let user = this.getUserById(id);
        user.isActif = false;
        if (confirm('Voulez-vous vraiment bannir cet utilisateur ?')) {
            this.serviceForum.updateUser(id, user).subscribe((user: Users) => {
                this.onDelete(commentId);
                this.ngOnInit();
            })
        }
    }

    scrollTop(): void {
        window.scroll(0, 0);
    }

    openImage(image: any): void {
        const dialogRef = this.dialog.open(ImageViewerComponent, {panelClass: 'custom-dialog-container'});
        dialogRef.componentInstance.image = image;
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}

