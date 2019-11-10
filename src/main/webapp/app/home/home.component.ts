import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import { CourseService } from 'app/shared/service/CourseService';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    classeNameNeedToReg: string;
    courses: CourseDto[] = [];
    course: CourseDto;
    coursesWithTN: CourseWithTNDto[] = [];
    private currentUserCredential: String;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private courseService: CourseService,
        //private currentUserCredential: CurrentUserCredential

) {}
    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    isStudent() {
        return this.principal.isStduent();
    }

    isTeacher() {
        return this.principal.isTeacher();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getAllCourses() {
        //debugger;
        this.courseService.getCourseInfo().subscribe(curDto => {
            if (!curDto) {
                this.courses = [];
            } else {
                this.courses = curDto;
                //console.log(this.courses);
            }
        });
    }

    getAllCoursesWithTN() {
        this.courseService.getCourseInfoWithTN().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    getRegisteredCourses() {
        this.courseService.getRegisteredCourses().subscribe(curDto => {
            if (!curDto) {
                this.coursesWithTN = [];
            } else {
                this.coursesWithTN = curDto;
            }
        });
    }

    dropCourse(courseName){
        this.courseService.drop(courseName).subscribe();
    }
    courseName: string;
    courseLocation: string;
    courseContent: string;
    teacherId: number;
    createCourse() {
        this.course = {
            courseName: this.courseName,
            courseLocation: this.courseLocation,
            courseContent: this.courseContent,
            teacherId: this.teacherId
        };
        //console.log(this.course);
        //debugger;
        this.courseService.create(this.course).subscribe();
    }

    deleteCourse(courseName) {
        //console.log(courseName);
        //debugger;
        this.courseService.delete(courseName).subscribe();
    }

    clearAllCourses() {
        this.courses = [];
    }

    clearRegisteredCourses() {
        this.coursesWithTN = [];
    }

    addCourseToStudent(courseName) {
        console.log(courseName);
        this.courseService.addCourseToStudent(courseName/*, this.currentUserCredential*/).subscribe();
    }
}
