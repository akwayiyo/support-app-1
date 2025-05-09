import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import API from "../api/api";

export default function LoginForm({ onLogin }) {
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      const res = await API.post("/login", values);
      localStorage.setItem("token", res.data.token);
      onLogin();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField label="Username" {...formik.getFieldProps("username")} />
      <TextField label="Password" type="password" {...formik.getFieldProps("password")} />
      <Button type="submit">Login</Button>
    </form>
  );
}
