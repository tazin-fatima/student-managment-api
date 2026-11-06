
import type { Request, Response } from "express";

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  course: string;
  isActive: boolean;
}

let students: Student[] = [
  {
    id: 1,
    name: "Ali",
    age: 22,
    email: "ali@gmail.com",
    course: "Web Development",
    isActive: true,
  },
  {
    id: 2,
    name: "Sara",
    age: 21,
    email: "sara@gmail.com",
    course: "Graphic Designing",
    isActive: true,
  },
];


export const getAllStudents = (
  _req: Request,
  res: Response
): void => {
  try {
    res.status(200).json({
      success: true,
      message: "All students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getStudentById = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
      return;
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const addStudent = (
  req: Request<{}, {}, Student>,
  res: Response
): void => {
  try {
    const { name, age, email, course, isActive } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      !course ||
      typeof course !== "string" ||
      typeof isActive !== "boolean"
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid student data",
      });
      return;
    }

    const newStudent: Student = {
      id: students.length > 0
        ? Math.max(...students.map((s) => s.id)) + 1
        : 1,
      name,
      age,
      email,
      course,
      isActive,
    };

    students.push(newStudent);

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateStudent = (
  req: Request<{ id: string }, {}, Student>,
  res: Response
): void => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
      return;
    }

    const student = students.find((s) => s.id === id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    const { name, age, email, course, isActive } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      !course ||
      typeof course !== "string" ||
      typeof isActive !== "boolean"
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid student data",
      });
      return;
    }

    student.name = name;
    student.age = age;
    student.email = email;
    student.course = course;
    student.isActive = isActive;

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const deleteStudent = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
      return;
    }

    const studentIndex = students.findIndex(
      (s) => s.id === id
    );

    if (studentIndex === -1) {
      res.status(404).json({
        success: false,
        message: "Student not found",
      });
      return;
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deletedStudent[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
