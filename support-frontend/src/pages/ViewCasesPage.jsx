import { useEffect, useState } from "react";
import API from "../api/api";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

export default function ViewCasesPage() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      const res = await API.get("/cases");
      setCases(res.data);
    };
    fetchCases();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Support Cases</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
