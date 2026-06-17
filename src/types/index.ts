export type User = {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
};

export type Student = {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  major: string;
  enrollment_year: number;
  created_at: string;
};

export type Course = {
  id: number;
  course_code: string;
  course_name: string;
  credits: number;
  instructor?: string;
  created_at: string;
};

export type Enrollment = {
  id: number;
  student_id: number;
  course_id: number;
  enrollment_date: string;
  status: string;
  student: Student;
  course: Course;
};

export type AdvisorResponse = {
  answer: string;
};
