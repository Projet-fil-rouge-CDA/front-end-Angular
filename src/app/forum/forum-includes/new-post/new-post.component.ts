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
            photo: '',
        });
    }

    get titre() {
        return this.newTalkForm.get('titre');
    }

    get categorie() {
        return this.newTalkForm.get('categorie');
    }

    get pseudo() {
        return this.newTalkForm.get('pseudo');
    }

    get contenu() {
        return this.newTalkForm.get('contenu');
    }

    get photo() {
        return this.newTalkForm.get('photo');
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('photo', this.photo?.value);
        formData.append('titre', this.titre?.value);
        formData.append('categorie', this.categorie?.value);
        formData.append('pseudo', this.pseudo?.value);
        formData.append('contenu', this.contenu?.value);

        console.log(this.titre?.value);
        console.log(formData.getAll('titre'));
        this.serviceForum.postPost(formData).subscribe(() => {
            this.serviceForum.getPosts(this.category).subscribe((posts: Post) => {
                this.posts = posts;
                this.router.navigate(['/forum/fils/talking'], {queryParams: {post: this.posts[this.posts.length - 1].id}}).then(r => {
                    window.location.reload();
                })
            })
        })
    }
}
