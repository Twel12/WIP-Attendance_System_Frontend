import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/auth-context';
import styles from 'styled-components';

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

    useEffect(() => {
        const loadAttendance = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/attendance/${SysID}`);
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error occurred while loading attendance details.</div>;
    }

    return (
        <div className="Student">
            <h1>Attendance Details</h1>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Present Count</th>
                        <th>Absent Count</th>
                        <th>Present Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((att) => (
                        <tr key={att._id}>
                            <td>{att._id}</td>
                            <td>{att.presentCount}</td>
                            <td>{att.absentCount}</td>
                            <td>{att.presentCount/(att.presentCount+att.absentCount)*100}%</td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </div>
    );
}
