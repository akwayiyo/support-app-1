import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../api/api";

export default function EditCasePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ title: "", description: "" });

  useEffect(() => {
    API.get("/cases").then((res) => {
      const found = res.data.find((c) => c.id.toString() === id);
      if (found) setInitialValues({ title: found.title, description: found.description });
    });
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      await API.put(`/cases/${id}`, values);
      navigate("/cases");
    }
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Edit Case</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          {...formik.getFieldProps("title")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          {...formik.getFieldProps("description")}
          margin="normal"
        />
        <Button variant="contained" type="submit">Save</Button>
      </form>
    </Container>
  );
}
