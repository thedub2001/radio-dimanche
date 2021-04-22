import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: [ './task-list.component.css' ]
})

export class TaskListComponent implements OnInit, OnDestroy {
    public fsData: Array<any>;
    public taskForm: FormGroup;
    public userAuth: Subscription;
    public taskDataSub: Subscription;
    public addFailed: boolean;

    constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router) {
        this.addFailed = false;
        this.fsData = new Array();

        this.taskForm = this.fb.group({
            task: new FormControl('', [ Validators.required, Validators.minLength(1) ])
        });
        this.userAuth = this.fs.signedIn.subscribe((user) => {
            if (user) {
                this.getTaskData();
            } else {
                this.router.navigate([ 'signin' ]);
            }
        });
    }

    ngOnInit(): void {}

    ngOnDestroy() {
        if (this.userAuth) this.userAuth.unsubscribe();
        if (this.taskDataSub) this.taskDataSub.unsubscribe();
    }

    async addTask(fg: FormGroup) {
        try {
            console.log(fg.valid, fg.value);
            if (!fg.valid) throw new Error('Invalid form data');
            this.addFailed = false;
            const result = await this.fs.addTask(fg.value);
            if (result) fg.reset();
            else throw new Error('Failed to add task; Something went wrong');
        } catch (error) {
            console.log(error);
            this.addFailed = true;
        }
    }

    async removeTask(task: any) {
        try {
            if (!task) throw new Error('Invalid task');
            const result = await this.fs.deleteTask(task.id);
            if (!result) throw new Error('Failed to remove task');
        } catch (error) {
            console.log(error);
            alert('Failed to remove task; something went wrong.');
        }
    }

    getTaskData() {
        this.taskDataSub = this.fs.getTasks().subscribe((data) => {
            this.fsData = data;
        });
    }

    signOut() {
        this.fs.signOut();
    }
}
