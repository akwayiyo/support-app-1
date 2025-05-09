import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography } from "@mui/material";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateCasePage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { title: "", description: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      await API.post("/cases", values);
      navigate("/cases");
    }
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Support Case</Typography>
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
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </Container>
  );
}
