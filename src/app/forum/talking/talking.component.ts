import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ForumService} from "../../shared/services/forum.service";
import {Post} from "../../shared/models/post";
import {Comment} from "../../shared/models/comment";
import { FormBuilder, FormGroup } from '@angular/forms';


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

    constructor(private route: ActivatedRoute, private titleService: Title,
                private serviceForum: ForumService,  private formBuilder: FormBuilder,) {
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

        this.talkingForm = this.formBuilder.group({
            username: 'Admin',
            message: '',
            date: new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}),
            id_post: this.idPost
        });
    }

    onSubmit(): void {
        this.serviceForum.postComment(this.talkingForm.value).subscribe((comment: Comment) => {
            this.comments.push(comment);
            this.talkingForm.reset();
            this.ngOnInit();
        })
    }
}
