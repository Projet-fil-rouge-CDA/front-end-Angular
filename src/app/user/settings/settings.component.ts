import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ValidationService} from "../../shared/services/validation.service";
import {UserService} from "../user.service";
import {optionUser} from "../../shared/models/optionUser";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "../../shared/services/token.service";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    deleteMessage: string;
    updateMessage: string;

    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

    optionForm: any;

    private userInfo: optionUser;
    private userUpdate: optionUser;

    constructor(
        private formBuilder: FormBuilder,
        private titleService: Title,
        private router: Router,
        private userService: UserService,
        private cookieService: CookieService,
        private tokenService: TokenService,
        private authService: AuthService
    ) {
        this.optionForm = this.formBuilder.group({
            nom: ['', [Validators.required, Validators.minLength(3)]],
            prenom: ['', [Validators.required, Validators.minLength(3)]],
            pseudo: ['', [Validators.required]],
            phone: ['', [ValidationService.phoneValidator]],
            email: ['', [Validators.required, ValidationService.emailValidator]],
            motDePasse: ['', [ValidationService.passwordValidator]],
            confirmPassword: ['', []],
            rue: ['', [Validators.required]],
            codePostal: ['', [Validators.required]],
            ville: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {
        this.titleService.setTitle('Univ\'Air | Option utilisateur');
        this.userService.getInfoOption(this.tokenService.takePseudo()).subscribe(res => {
            this.optionForm.patchValue({
                nom: res.nom,
                prenom: res.prenom,
                pseudo: res.pseudo,
                phone: res.phone ? res.phone : '',
                email: res.email,
                motDePasse: '',
                confirmPassword: '',
                rue: res.rue,
                codePostal: res.codePostal,
                ville: res.ville
            })
            this.userInfo = this.optionForm.value;
        });
    }

    togglePassword() {
        this.showPassword = !this.showPassword
    }

    toggleConfirmPassword() {
        this.showConfirmPassword = !this.showConfirmPassword
    }

    optionUser() {
        let isPseudoExist: boolean = false;
        this.userUpdate = this.optionForm.value;
        if (JSON.stringify(this.userInfo) === JSON.stringify(this.userUpdate)) {

        } else {
            if (this.userUpdate.motDePasse == this.userUpdate.confirmPassword) {
                if (this.userUpdate.pseudo !== this.userInfo.pseudo) {
                    this.userService.verificationPseudoAvailable(this.userUpdate.pseudo).subscribe(res => {
                        isPseudoExist = res;
                        this.checkPseudoExist(isPseudoExist);
                    })
                } else {
                    this.checkPseudoExist(isPseudoExist);
                }
            }else{
                this.updateMessage = "Les mots de passe ne correspondent pas"
            }
        }
    }

    deleteAccount() {
        const result = window.confirm("Voulez-vous vraiment supprimer votre compte ?");
        if (result) {
            this.userService.deleteUser(this.tokenService.takePseudo(), this.tokenService.takePrenom(), this.tokenService.takeNom()).subscribe(res => {
                if (res != null) {
                    this.authService.logout();
                } else {
                    this.deleteMessage = res;
                }
            });
        }
    }

    checkPseudoExist(isPseudoExist: boolean) {
        if (!isPseudoExist) {
            this.userService.updateInfoOption(this.tokenService.takePseudo(), this.userUpdate).subscribe(res => {
                if (res != null) {
                    this.cookieService.set('session', res.Token.value)
                }
                this.updateMessage = res.Success
            });
            this.userInfo = this.userUpdate;
            this.optionForm.patchValue({
                motDePasse: '',
                confirmPassword: ''
            })
        }
    }
}
