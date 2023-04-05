import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../shared/services/forum.service";
import {Post} from "../../shared/models/post";
import {Comment} from "../../shared/models/comment";
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageViewerComponent} from "../forum-includes/image-viewer/image-viewer.component";
import {MatDialog} from '@angular/material/dialog';
import {Observable} from "rxjs";

@Component({
    selector: 'app-talking', templateUrl: './talking.component.html', styleUrls: ['./talking.component.scss']
})
export class TalkingComponent implements OnInit {

    idPost: string | null;
    post: any;
    talkingForm: FormGroup;
    users: Array<any>;

    constructor(private route: ActivatedRoute, private titleService: Title, private serviceForum: ForumService, private formBuilder: FormBuilder, public dialog: MatDialog) {
        this.getUserInfos();
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .subscribe(params => {
                this.idPost = params.get('post');

                this.serviceForum.getSpecificPost(this.idPost).subscribe((post: Post) => {
                    this.post = post;
                })
            });

        this.titleService.setTitle('Univ\'Air | Forum - Post - ' + this.idPost);

        this.talkingForm = this.formBuilder.group({
            contenu: '',
            date: new Date().toISOString(),
            id: 0,
            postId: Number(this.idPost),
            pseudo: 'Admin'
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

    getUserInfos(): void {
        this.serviceForum.getUsers().subscribe((users: any) => {
            this.users = users;
        })
    }

    onSubmit(): void {
        this.serviceForum.postComment(this.talkingForm.value).subscribe((comment: Comment) => {
            // this.comments.push(comment);
            this.talkingForm.reset();
            this.ngOnInit();
        })
    }

    onDelete(id: any, fromBan = false): void {
        if (fromBan || confirm('Êtes vous sur de vouloir supprimer ce commentaire ?')) {
            this.serviceForum.deleteComment(id).subscribe(() => {
                this.ngOnInit();
            })
        }
    }


    onBan(id: number, commentID: number): void {
        let pseudo
        for (const user of this.users) {
            if (user.idUser === id) {
                pseudo = user.pseudo
            }
        }
        if (confirm('Voulez-vous vraiment bannir cet utilisateur ?') && pseudo) {
            this.serviceForum.updateUser( pseudo, false).subscribe(() => {
                this.onDelete(commentID, true)
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

