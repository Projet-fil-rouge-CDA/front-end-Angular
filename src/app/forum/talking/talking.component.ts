import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../shared/services/forum.service";
import {Post} from "../../shared/models/post";
import {Comment} from "../../shared/models/comment";
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-talking',
    templateUrl: './talking.component.html',
    styleUrls: ['./talking.component.scss']
})
export class TalkingComponent implements OnInit {

    idPost: any;
    posts: any;
    comments: any;
    talkingForm: FormGroup;
    users: any;

    constructor(private route: ActivatedRoute, private titleService: Title,
                private serviceForum: ForumService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .subscribe(params => {
                this.idPost = params.get('post');
            });

        this.titleService.setTitle('Univ\'Air | Forum - Post - ' + this.idPost);

        this.serviceForum.getPosts().subscribe((posts: Post) => {
            this.posts = posts;
        })

        this.serviceForum.getComments().subscribe((comments: Comment) => {
            this.comments = comments;
        })

        this.serviceForum.getUsers().subscribe((users: any) => {
            this.users = users;
        })

        this.talkingForm = this.formBuilder.group({
            username: 'Admin',
            message: '',
            date: new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}),
            id_post: this.idPost,
            id_user: '1',
            image: ''
        });

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

    ngAfterViewInit(): void {
        // @ts-ignore
        document.getElementById("skeletonLoader").style.display = "none";
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
            }
        )
    }

    scrollTop(): void {
        window.scroll(0, 0);
    }
}

