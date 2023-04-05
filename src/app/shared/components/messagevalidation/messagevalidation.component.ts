import {Component, Input} from '@angular/core';

@Component({
    selector: 'message-validation',
    template: `
        <div *ngIf="show" class="position-fixed start-50 translate-middle"
             style="top: 150px; opacity: 0.8; background-color: green; color: white; padding: 1rem; border-radius: 0.25rem; z-index: 1000; transition: opacity 2s">
            {{textMessage}}
        </div>
    `,
})
export class MessagevalidationComponent {
    @Input() textMessage: string = '';
    private _show: boolean = false;

    constructor() {
    }

    ngOnInit() {
        if (this.show) {
            setTimeout(() => {
                this.show = false;
            }, 3000);
        }
    }

    get show() {
        return this._show;
    }

    @Input()
    set show(value: boolean) {
        this._show = value;
        if (this._show) {
            setTimeout(() => {
                this._show = false;
            }, 3000);
        }
    }
}
