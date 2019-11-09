import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from 'app/shared/model/course-dto.model';
import { SERVER_API_URL } from 'app/app.constants';
import { CourseWithTNDto } from 'app/shared/model/courseWithTN-dto.model';

@Injectable()
export class CourseService {
    private courseAddressUrl = SERVER_API_URL + '/api/course/findAllCoursesDto';
    private courseAddressWithTNUrl = SERVER_API_URL + '/api/course/findAllCoursesWithTNDto';
    private courseDeleteUrl = SERVER_API_URL + '/api/course/deleteCourse';
    private courseUpdateUrl = SERVER_API_URL + '/api/course/updateCourse';
    private addCourseToStudentUrl = SERVER_API_URL + '/api/course/addCourseToStudent';
    private createCourseUrl = SERVER_API_URL + '/api/course/createCourse';
    private registeredCourseUrl = SERVER_API_URL + '/api/course/findRegisteredCourses';
    private dropCourseUrl = SERVER_API_URL + '/api/course/dropCourse';


    constructor(private http: HttpClient) {}

    getCourseInfo(): Observable<CourseDto[]> {
        //debugger;
        return this.http.get<CourseDto[]>(`${this.courseAddressUrl}`);
    }

    getCourseInfoWithTN(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.courseAddressWithTNUrl}`);
    }

    getRegisteredCourses(): Observable<CourseWithTNDto[]> {
        return this.http.get<CourseWithTNDto[]>(`${this.registeredCourseUrl}`);
    }

    create(course: CourseDto): Observable<CourseDto> {
        return this.http.post<CourseDto>(this.createCourseUrl, course);
    }

    delete(courseName: String): Observable<Response> {
        return this.http.delete<Response>(`${this.courseDeleteUrl}/${courseName}`);
    }

    drop(courseName: String): Observable<Response> {
        return this.http.delete<Response>(`${this.dropCourseUrl}/${courseName}`);
    }

    update(course: CourseDto): Observable<Response> {
        return this.http.put<Response>(this.courseUpdateUrl, course);
    }

    addCourseToStudent(courseName: String/*, currentUserCredential: String*/): Observable<Response> {
        return this.http.post<Response>(`${this.addCourseToStudentUrl}/${courseName}`, courseName);
        //return this.http.post<Response>(`${this.addCourseToStudentUrl}/${courseName}`, { courseName/*, currentUserCredential*/ });
    }
}
