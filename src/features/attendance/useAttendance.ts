import { useState } from "react";

const attendanceData = [
  {
    id: "1",
    subject: "Mathematics",
    date: "2024-01-15",
    status: "present",
    time: "9:00 AM - 10:00 AM",
    instructor: "Dr. Smith"
  },
  {
    id: "2", 
    subject: "Physics",
    date: "2024-01-15",
    status: "present",
    time: "11:00 AM - 12:00 PM",
    instructor: "Prof. Johnson"
  },
  {
    id: "3",
    subject: "Chemistry", 
    date: "2024-01-14",
    status: "absent",
    time: "2:00 PM - 3:00 PM",
    instructor: "Dr. Williams"
  },
  {
    id: "4",
    subject: "English",
    date: "2024-01-14", 
    status: "present",
    time: "3:00 PM - 4:00 PM",
    instructor: "Ms. Brown"
  },
  {
    id: "5",
    subject: "Mathematics",
    date: "2024-01-13",
    status: "late",
    time: "9:00 AM - 10:00 AM", 
    instructor: "Dr. Smith"
  }
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
