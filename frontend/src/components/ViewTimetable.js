import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const ViewTimetable = ({ timetableData }) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Allocation ID</TableCell>
            <TableCell>Program Name</TableCell>
            <TableCell>Department Name</TableCell>
            <TableCell>Spring/Fall</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Session Name</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Teacher Name</TableCell>
            <TableCell>Section Name</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timetableData && timetableData.length > 0 ? (
            timetableData.map((Timetable, index) => (
              <TableRow key={index}>
                <TableCell>{Timetable.alo_id}</TableCell>
                <TableCell>{Timetable.program_name}</TableCell>
                <TableCell>{Timetable.department_name}</TableCell>
                <TableCell>{Timetable.springFall}</TableCell>
                <TableCell>{Timetable.year}</TableCell>
                <TableCell>{Timetable.session_name}</TableCell>
                <TableCell>{Timetable.batch}</TableCell>
                <TableCell>{Timetable.teacher_name}</TableCell>
                <TableCell>{Timetable.section_name}</TableCell>
                <TableCell>{Timetable.room_number}</TableCell>
                <TableCell>{Timetable.course_name}</TableCell>
                <TableCell>{Timetable.time}</TableCell>
                <TableCell>{Timetable.day}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={13} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ViewTimetable;
