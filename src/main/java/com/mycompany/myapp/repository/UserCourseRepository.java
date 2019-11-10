package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.UserCourse;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.dto.CourseWithTNDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserCourseRepository extends JpaRepository<UserCourse, Long>{

    /*@Query("SELECT new com.mycompany.myapp.domain.dto.CourseWithTNDto(c.courseName, c.courseLocation, c.courseContent, u.login) from Course c left join User u on c.teacherId = u.id left join UserCourse uc on c.id = uc.course where (:userid) = uc.user")
    List<CourseWithTNDto> findRegisteredCoursesFrom(@Param("userId") Long userid);*/
    @Query(
        "SELECT new com.mycompany.myapp.domain.dto.CourseWithTNDto(c.courseName, c.courseLocation, c.courseContent, u.login) " +
            "FROM Course c " +
        "INNER JOIN User u ON c.teacherId = u.id " +
        "INNER JOIN UserCourse uc ON c.id = uc.course " +
            "WHERE uc.user = (:user)")
    List<CourseWithTNDto> findRegisteredCoursesFrom(@Param("user") User user);

    Optional<UserCourse> findUserCourseByCourseAndUser(Course course, User user);

    @Query(
        "DELETE FROM UserCourse uc WHERE uc.course = :course AND uc.user = (:user)")
    void deleteByCourseAndUser (@Param("course")Course course,@Param("user")User user);
}
