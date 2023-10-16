import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";
import styles from "styled-components";
import Header from "../components/Header/Header";
import { Box } from "@mui/material";

const StyledTable = styles.table`
    border-collapse: collapse;
    width: 100%;
    & th, td {
        text-align: left;
        padding: 8px;
    }
    & th {
        background-color: #4CAF50;
        color: white;
    }
    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export default function Student() {
  const authCtx = useContext(AuthContext);
  const SysID = authCtx.data.SysID;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    const loadAttendance = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/attendance/${SysID}`
        );
        if (response.status === 200) {
          console.log(response.data);
          setAttendance(response.data);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
      setIsLoading(false);
    };
    loadAttendance();
  }, [SysID]);

  const handleCheckboxChange = async (rowId, subject) => {
    if (rowId === selectedRow) {
      setSelectedRow(null);
    } else {
      setSelectedRow(rowId);
      try {
        const response = await axios.get(
          `http://localhost:3001/attendance/${SysID}/${subject}`
        );
        console.log(response.data);
        setDropdownData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error occurred while loading attendance details.</Box>;
  }

  return (
    <Box>
      <Header />
      <Box
        className="Student"
        style={{
          paddingLeft: "10px",
          paddingTop: "10px",
          paddingRight: "10px",
        }}
      >
        <h1>Attendance Details</h1>
        <StyledTable>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Present Count</th>
              <th>Absent Count</th>
              <th>Present Percentage</th>
              <th>Get Detailed View</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((att) => (
              <React.Fragment key={att._id}>
                <tr className={selectedRow === att._id ? "selected" : ""}>
                  <td>{att._id}</td>
                  <td>{att.presentCount}</td>
                  <td>{att.absentCount}</td>
                  <td>
                    {(att.presentCount / (att.presentCount + att.absentCount)) *
                      100}
                    %
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRow === att._id}
                      onChange={() => handleCheckboxChange(att._id, att._id)}
                    />
                  </td>
                </tr>
                {selectedRow === att._id && dropdownData && (
                  <tr>
                    <td colSpan={5}>
                      <StyledTable>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Attendance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dropdownData.map((item) => (
                            <tr key={item.date}>
                              <td>{item.date}</td>
                              <td>
                                {item.attendance[0] ? "Present" : "Absent"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </StyledTable>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </StyledTable>
      </Box>
    </Box>
  );
}
