import "./SubscribeUser.css";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

const baseURL: string = "/register";

const SubscribeUser = () => {

  const navigate = useNavigate();

  // form validation with yup
  const SignUpSchema = Yup.object().shape({
    // username
    userName: Yup.string()
      .min(4, "username should have at least 4 caracters")
      .max(20, "Username cannot exceed 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      )
      .required("username is required"),

    // email
    email: Yup.string()
      .email("Invalid Email format")
      .required("Email is required"),

    // password
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password cannot exceed 16 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase char")
      .required("Password is required"),
  });

  console.log("SignUpSchema:", SignUpSchema);

  // formik logic
  const formik = useFormik({
    initialValues: { userName: "", email: "", password: "" },
    validationSchema: SignUpSchema,

    onSubmit: (values) => {
      console.log("submitted values:", values);

      // calling axios to autheticate (with user and password)
      try {
        const email = formik.values.email;
        const password = formik.values.password;

        const response = axios.post(
          baseURL,
          JSON.stringify({ email: email, password: password }),
          {
            headers: { "Context-type": "application/json" },
            withCredentials: true,
          },
        );

        console.log("retorno response subscribe:", response);

        navigate("/login");
        
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log("formik:", formik);

  function goToLoginUser() {
    navigate("/")
  }

  console.log("isValid:", formik.isValid);
  console.log("errors:", formik.errors);
  console.log("values:", formik.values);

  return (
    <>
      <section>
        <h1>Faça seu cadastro</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* userName */}
          <div className="input-container-subscribe">
            <label htmlFor="">User Name</label>
            <input
              onChange={formik.handleChange}
              value={formik.values.userName}
              type="text"
              name="userName"
              id="userName"
              placeholder="type your name"
            />
            {formik.errors.userName ? (
              <span style={{ color: "red" }}>{formik.errors.userName}</span>
            ) : null}
          </div>

          {/* email */}
          <div className="input-container-subscribe">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="type your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <span style={{ color: "red" }}>{formik.errors.email}</span>
            ) : null}
          </div>

          {/* password */}
          <div className="input-container-subscribe">
            <label htmlFor="">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="type your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <span style={{ color: "red" }}>{formik.errors.password}</span>
            ) : null}
          </div>

          <button type="submit">Subscribe</button>

          <div
            style={{ marginTop: "10px", display: "flex", flexDirection: "row" }}
          >
            <span style={{ color: "black", marginRight: "10px" }}>
              Já possui conta?
            </span>
            <span
              style={{
                color: "red",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={goToLoginUser}
            >
              faça seu login
            </span>
          </div>
        </form>
      </section>
    </>
  );
};

export default SubscribeUser;
