import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ForumService} from '../../shared/services/forum.service';
import {Category} from "../../shared/models/category";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    categories: any;

    constructor(
        private titleService: Title,
        private serviceForum: ForumService
    ) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('Univ\'Air | Forum');
        this.serviceForum.getCategories().subscribe((categories: Category) => {
            this.categories = categories;
            console.log(this.categories)
        })
    }
}
