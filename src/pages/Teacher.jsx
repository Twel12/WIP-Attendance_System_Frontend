import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Teacher.css'
const Teacher = () => {
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [dateList, setDateList] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [checkboxValues, setCheckboxValues] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await axios.post('http://localhost:3001/attendance/SubjectList/004');
            if (response.status === 200 && response.data.length > 0) {
                setSubjectList(response.data[0].subjects);
            }
        }
        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchDates = async () => {
            if (selectedSubject) {
                const response = await axios.post(`http://localhost:3001/attendance/DateList/Subject/004`);
                if (response.status === 200) {
                    const filterSubject = response.data[0].subjects.find(subject => subject.name === selectedSubject);
                    const subjectdates = filterSubject.dates.map(dateObj => dateObj.date);
                    setDateList(subjectdates);
                }
            }
        }
        fetchDates();
    }, [selectedSubject]);

    const handleSubjectChange = event => {
        setSelectedSubject(event.target.value);
        setSelectedDate('');
    }

    const handleCheckboxChange = (index) => {
        const newCheckboxValues = [...checkboxValues];
        newCheckboxValues[index] = !newCheckboxValues[index];
        setCheckboxValues(newCheckboxValues);
    }
    
    const fetchAttendance = async () => {
        if (selectedDate && selectedSubject) {
            const response = await axios.post('http://localhost:3001/attendance/AttendanceList', { SubjectName: selectedSubject, Date: selectedDate });
            if (response.status === 200) {
                setAttendanceData(response.data);
            }
        }
    }

    const handleDateChange = event => {
        setSelectedDate(event.target.value);
    }

    const handleAttendanceClick = async () => {
        const response = await axios.post(`http://localhost:3001/attendance/AttendanceList/`, {
            Date: selectedDate,
            SubjectName: selectedSubject
        });
        if (response.status === 200) {
            console.log(response.data);
            setAttendanceData(response.data);
            // do something with the attendance data
        }
    }

    return (
        <div style={{ paddingLeft: "10px", paddingTop: "5px" }}>
            <h1>Teacher Page</h1><br/>
            <label htmlFor="subjects">Select Subject:</label>
            <select id="subjects" onChange={handleSubjectChange} className="btn-primary dropdown-toggle">
    <option value="">Select a Subject</option>
    {subjectList.length > 0 && subjectList.map(subject => (
        <option key={subject.name} value={subject.name}>{subject.name}</option>
    ))}
</select>

            {selectedSubject && (
                <div>
                    <br />
                    <label htmlFor="dates">Select Date:</label>
                    <select id="dates" onChange={handleDateChange} className="btn-primary dropdown-toggle">
    <option value="">Select a Date</option>
    {dateList.length > 0 && dateList.map(date => (
        <option key={date} value={date}>{date}</option>
    ))}
</select>

                    <Button variant="primary" onClick={handleAttendanceClick}>Get Attendance</Button>
                </div>
            )}
            {selectedDate && <p>You have selected {selectedDate}.</p>}
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
        <td>{attendanceData[0].value[index] ? "Present" : "Absent"}</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id={`attendanceCheck${index}`}
              defaultChecked={attendanceData[0].value[index]}
            />
            <label class="form-check-label" htmlFor={`attendanceCheck${index}`}>
              Mark Attendance
            </label>
          </div>
        </td>
      </tr>
      
    ))}
  </tbody>
  <Button variant="primary" onClick={handleAttendanceClick}>Submit Attendance</Button>
</table>

            )}

        </div>
    );
};

export default Teacher;
