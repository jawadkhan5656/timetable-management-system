import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const SessionTable = ({ session = [] }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Session ID</TableCell>
                    <TableCell>Session Name</TableCell>
                    <TableCell>Batch</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {session.length > 0 ? (
                    session.map((sessionItem, index) => (
                        <TableRow key={sessionItem.session_id}>

                            <TableCell>{sessionItem.session_id}</TableCell>
                            <TableCell>{sessionItem.session_name}</TableCell>
                            <TableCell>{sessionItem.batch}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={2}>No Sessions Available</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default SessionTable;
 