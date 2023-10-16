import axios from "axios";
import { useContext, React } from "react";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { Box } from "@mui/material";
import Header from "../components/Header/Header";

const Teacher = () => {
  const AuthCtx = useContext(AuthContext);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [dateList, setDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.post(
        "http://localhost:3001/attendance/SubjectList/004"
      );
      if (response.status === 200 && response.data.length > 0) {
        setSubjectList(response.data[0].subjects);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      if (selectedSubject) {
        const response = await axios.post(
          `http://localhost:3001/attendance/DateList/Subject/004`
        );
        if (response.status === 200) {
          const filterSubject = response.data[0].subjects.find(
            (subject) => subject.name === selectedSubject
          );
          const subjectdates = filterSubject.dates.map(
            (dateObj) => dateObj.date
          );
          setDateList(subjectdates);
        }
      }
    };
    fetchDates();
  }, [selectedSubject]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setSelectedDate("");
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setCheckboxValues(newCheckboxValues);
  };

  const fetchAttendance = async () => {
    if (selectedDate && selectedSubject) {
      const response = await axios.post(
        "http://localhost:3001/attendance/AttendanceList",
        { SubjectName: selectedSubject, Date: selectedDate }
      );
      if (response.status === 200) {
        setAttendanceData(response.data);
      }
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSelectedDate("");
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAttendanceClick = async () => {
    const response = await axios.post(
      `http://localhost:3001/attendance/AttendanceList/`,
      {
        Date: selectedDate,
        SubjectName: selectedSubject,
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      setAttendanceData(response.data);
      // do something with the attendance data
    }
  };

  return (
    <Box>
      <Header />
      <Box style={{ paddingLeft: "10px", paddingTop: "5px" }}>
        <h1>Welcome Back {AuthCtx.data.name}</h1>
        <br />
        <Box>
          <label>Select Subject:</label>
          <ButtonGroup>
            {subjectList.map((subject) => (
              <Button
                key={subject.name}
                variant={
                  subject.name === selectedSubject ? "primary" : "secondary"
                }
                onClick={() => handleSubjectClick(subject.name)}
              >
                {subject.name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>

        {selectedSubject && (
          <Box>
            <br />
            <label>Select Date:</label>
            <ButtonGroup>
              {dateList.map((date) => (
                <Button
                  key={date}
                  variant={date === selectedDate ? "primary" : "secondary"}
                  onClick={() => handleDateClick(date)}
                >
                  {date}
                </Button>
              ))}
            </ButtonGroup>

            <Button variant="primary" onClick={handleAttendanceClick}>
              Get Attendance
            </Button>
          </Box>
        )}
        {attendanceData.length > 0 && (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">System ID</th>
                <th scope="col">Attendance</th>
                <th scope="col">Updated Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData[0].SystemID.map((systemID, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{systemID}</td>
                  <td>
                    {attendanceData[0].value[index] ? "Present" : "Absent"}
                  </td>
                  <td>
                    <Box class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id={`attendanceCheck${index}`}
                        defaultChecked={attendanceData[0].value[index]}
                      />
                      <label
                        class="form-check-label"
                        htmlFor={`attendanceCheck${index}`}
                      >
                        Mark Attendance
                      </label>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
            <Button variant="primary" onClick={handleAttendanceClick}>
              Submit Attendance
            </Button>
          </table>
        )}
      </Box>
    </Box>
  );
};

export default Teacher;
