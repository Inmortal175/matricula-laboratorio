import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-countdown-timer',
    standalone: true,
    imports: [ NgClass,],
    templateUrl: './countdown-timer.component.html',
    styleUrl: './countdown-timer.component.css'
})
export class CountdownTimerComponent {
    @Input() username! : string;
    // @Input() LogOut! : void;
    @Output() countdownFinished = new EventEmitter<void>();

    days: number = 0;
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    
    isCountdownComplete: boolean = false;
    
    private countdownInterval: any;
    private deadline: number;

    @Input() logoutMethod: (() => void) | null = null; //asi se recibe el tipo void

    onLogout() {
        if (this.logoutMethod) {
        this.logoutMethod();
        }
    }

    constructor() {
        this.deadline = this.getExpirationDate().getTime();
    }

    ngOnInit() {
        this.updateCountdown();
        this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
    }

    ngOnDestroy() {
        if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        }
    }

    private getExpirationDate(): Date {
        const currentYear = new Date().getFullYear();
        let expirationDate = new Date(`Dec 16, ${currentYear} 08:00:00`);
        
        // If the current date is past the expiration date, set it to the next year
        if (new Date() > expirationDate) {
        // expirationDate = new Date(`May 26, ${currentYear + 1} 23:59:59`);
        }
        
        return expirationDate;
    }

    private updateCountdown() {
        const now = new Date().getTime();    
        const timeToLive = this.deadline - now;
    
        // Getting value of days, hours, minutes, seconds
        this.days = Math.floor(timeToLive / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((timeToLive % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((timeToLive % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((timeToLive % (1000 * 60)) / 1000);
    
        // Reset to zero if time has passed
        if (timeToLive < 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        
        // Set flag and emit event
        if (!this.isCountdownComplete) {
            this.isCountdownComplete = true;
            this.countdownFinished.emit();
            clearInterval(this.countdownInterval);
        }
        }
    }
}
