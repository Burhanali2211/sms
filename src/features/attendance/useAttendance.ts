import { useState } from "react";

const attendanceData = [
  { id: "1",  subject: "Mathematics",          date: "2026-05-25", status: "present", time: "8:00 AM - 9:00 AM",   instructor: "Ms. Sunita Mishra" },
  { id: "2",  subject: "Physics",              date: "2026-05-25", status: "present", time: "9:00 AM - 10:00 AM",  instructor: "Ms. Deepa Iyer" },
  { id: "3",  subject: "English Literature",   date: "2026-05-25", status: "late",    time: "10:15 AM - 11:15 AM", instructor: "Mr. Arun Khanna" },
  { id: "4",  subject: "Chemistry",            date: "2026-05-25", status: "present", time: "11:30 AM - 12:30 PM", instructor: "Ms. Priya Sharma" },
  { id: "5",  subject: "Physical Education",   date: "2026-05-25", status: "present", time: "2:00 PM - 3:00 PM",   instructor: "Mr. Suresh Yadav" },
  { id: "6",  subject: "Computer Science",     date: "2026-05-24", status: "present", time: "8:00 AM - 9:00 AM",   instructor: "Mr. Vikram Patel" },
  { id: "7",  subject: "Mathematics",          date: "2026-05-24", status: "absent",  time: "9:00 AM - 10:00 AM",  instructor: "Ms. Sunita Mishra" },
  { id: "8",  subject: "Biology",              date: "2026-05-24", status: "present", time: "10:15 AM - 11:15 AM", instructor: "Mr. Rajesh Kumar" },
  { id: "9",  subject: "History",              date: "2026-05-24", status: "present", time: "11:30 AM - 12:30 PM", instructor: "Mr. Ramesh Tiwari" },
  { id: "10", subject: "Hindi",                date: "2026-05-24", status: "present", time: "2:00 PM - 3:00 PM",   instructor: "Ms. Meena Joshi" },
  { id: "11", subject: "Physics",              date: "2026-05-23", status: "present", time: "8:00 AM - 9:00 AM",   instructor: "Ms. Deepa Iyer" },
  { id: "12", subject: "English Literature",   date: "2026-05-23", status: "absent",  time: "9:00 AM - 10:00 AM",  instructor: "Mr. Arun Khanna" },
  { id: "13", subject: "Geography",            date: "2026-05-23", status: "present", time: "10:15 AM - 11:15 AM", instructor: "Mr. Sanjay Bhatt" },
  { id: "14", subject: "Chemistry",            date: "2026-05-23", status: "late",    time: "11:30 AM - 12:30 PM", instructor: "Ms. Priya Sharma" },
  { id: "15", subject: "Computer Science",     date: "2026-05-23", status: "present", time: "2:00 PM - 3:00 PM",   instructor: "Mr. Vikram Patel" },
  { id: "16", subject: "Mathematics",          date: "2026-05-22", status: "present", time: "8:00 AM - 9:00 AM",   instructor: "Ms. Sunita Mishra" },
  { id: "17", subject: "Biology",              date: "2026-05-22", status: "present", time: "9:00 AM - 10:00 AM",  instructor: "Mr. Rajesh Kumar" },
  { id: "18", subject: "Physics",              date: "2026-05-22", status: "present", time: "10:15 AM - 11:15 AM", instructor: "Ms. Deepa Iyer" },
  { id: "19", subject: "Art & Craft",          date: "2026-05-22", status: "absent",  time: "11:30 AM - 12:30 PM", instructor: "Ms. Kavita Nair" },
  { id: "20", subject: "Economics",            date: "2026-05-22", status: "present", time: "2:00 PM - 3:00 PM",   instructor: "Mr. Thomas Joseph" },
  { id: "21", subject: "Hindi",                date: "2026-05-21", status: "present", time: "8:00 AM - 9:00 AM",   instructor: "Ms. Meena Joshi" },
  { id: "22", subject: "Mathematics",          date: "2026-05-21", status: "late",    time: "9:00 AM - 10:00 AM",  instructor: "Ms. Sunita Mishra" },
  { id: "23", subject: "Chemistry",            date: "2026-05-21", status: "present", time: "10:15 AM - 11:15 AM", instructor: "Ms. Priya Sharma" },
  { id: "24", subject: "Music",               date: "2026-05-21", status: "present", time: "11:30 AM - 12:30 PM", instructor: "Ms. Lata Desai" },
  { id: "25", subject: "History",              date: "2026-05-21", status: "present", time: "2:00 PM - 3:00 PM",   instructor: "Mr. Ramesh Tiwari" },
];

export const useAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(record => record.status === "present").length;
  const absentClasses = attendanceData.filter(record => record.status === "absent").length;
  const lateClasses = attendanceData.filter(record => record.status === "late").length;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);

  return {
    selectedDate,
    setSelectedDate,
    attendanceData,
    totalClasses,
    presentClasses,
    absentClasses,
    lateClasses,
    attendancePercentage
  };
};
