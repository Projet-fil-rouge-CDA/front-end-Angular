import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../../../shared/services/forum.service";
import {Post} from "../../../shared/models/post";


@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.html',
    styleUrls: ['./new-post.scss']
})
export class NewPostComponent implements OnInit {

    newTalkForm: FormGroup
    category: any
    posts: any;

    constructor(private route: ActivatedRoute, private serviceForum: ForumService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParamMap
            .subscribe(params => {
                this.category = params.get('category');
            });

        this.serviceForum.getPosts(this.category).subscribe((posts: Post) => {
            this.posts = posts;
        })

        this.newTalkForm = this.formBuilder.group({
            titre: '',
            categorie: this.category,
            pseudo: 'admin',
            contenu: '',
            date: new Date().toISOString(),
            image: ''
        });


    }

    onSubmit() {
        this.serviceForum.postPost(this.newTalkForm.value).subscribe(() => {
            this.serviceForum.getPosts(this.category).subscribe((posts: Post) => {
                this.posts = posts;
                this.router.navigate(['/forum/fils/talking'], {queryParams: {post: this.posts[this.posts.length - 1].id}}).then(r => {
                    window.location.reload();
                })
            })
        })
    }
}
