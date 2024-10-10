import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const DepartmentTable = ({ department }) => {
    return (
        <Table>
            <TableHead> 
                <TableRow>
                    <TableCell>Department ID</TableCell>
                    <TableCell>Department Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {department?.map((department) => (  // Use optional chaining
                    <TableRow key={department.department_id}>
                        <TableCell>{department.department_id}</TableCell>
                        <TableCell>{department.department_name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default DepartmentTable;
