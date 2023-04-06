import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    date: Date = new Date();

  isHomePage: boolean = false;  constructor(public router: Router) {
    }

    ngOnInit(): void {
    // Vérifier si on est sur le composant Home
        if (this.router.url === '/') {
            this.isHomePage = true;
        }
    }

}
