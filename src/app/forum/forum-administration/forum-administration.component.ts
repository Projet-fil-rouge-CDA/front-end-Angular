import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ForumService} from "../../shared/services/forum.service";
import {Category} from "../../shared/models/category";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-forum-administration',
    templateUrl: './forum-administration.component.html',
    styleUrls: ['./forum-administration.component.scss']
})
export class ForumAdministrationComponent implements OnInit {
    categoryForm: FormGroup;
    categories: any;

    constructor(private formBuilder: FormBuilder, private serviceForum: ForumService, private titleService: Title,) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('Univ\'Air | Administration forum')


        this.serviceForum.getCategories().subscribe((categories: Category) => {
            this.categories = categories;
        })

        this.categoryForm = this.formBuilder.group({
            description: '',
            id: 0,
            libelle: '',
            estActive: true
        });
    }

    onSubmit() {
        this.serviceForum.createCategory(this.categoryForm.value).subscribe(() => {
            this.categoryForm.reset();
            alert('Nouvelle rubrique créée avec succès !')
        })
    }

    onDelete() {
        // @ts-ignore
        const categoryId = document.getElementById('forumAdminDelete')?.value;

        this.serviceForum.changeActiveCategory(false, categoryId).subscribe(() => {
            alert('Rubrique supprimée avec succès !')
            this.ngOnInit();
        })

    }

}
