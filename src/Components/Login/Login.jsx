import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { userContext } from "../Context/userContext";
import Footer from "../Footer/Footer";
export default function Login() {
  // using UserContext
  let { setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //  validation using yup
  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with capital letter & min(5) & max(10)"
      )
      .required("Required"),
  });
  // navigateTo Home
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <>
      <Formik
        // inputsData
        initialValues={{
          email: "",
          password: "",
        }}
        // validation
        validationSchema={SignInSchema}
        // send data to backend
        onSubmit={async (values) => {
          setIsLoading(true);
          let { data } = await axios
            .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            // handel error if request faild
            .catch((err) => {
              setIsLoading(false);
              setError(err.response.data.message);
            });
          // console.log(data.token);
          if (data.message === "success") {
            localStorage.setItem("usertoken", data.token);
            // setToken in context
            setUserToken(data.token);
            // navigateTo home
            navigateToHome();
            setIsLoading(false);
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          dirty,
          errors,
          touched,
          /* and other goodies */
        }) => (
          <div className="container d-flex justify-content-center py-5">
            <Row className="py-5 w-75">
              <h1 className="fs-4">Login Now:</h1>
              {error ? (
                <Col md={12} className="validationBox mt-2 p-2">
                  {error}
                </Col>
              ) : null}
              <Form onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.email && touched.email ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.email}
                    </Col>
                  ) : null}
                </Row>
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.password && touched.password ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.password}
                    </Col>
                  ) : null}
                </Row>

                <Row className="mt-3">
                  {isLoading === true ? (
                    <Col md={1}>
                      <Button
                        className="bg-main border-0 text-white cursor-pointer"
                        variant="primary"
                        type="submit"
                      >
                        <Hourglass
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={["white", "#white"]}
                        />
                      </Button>
                    </Col>
                  ) : (
                    <Col md={1}>
                      <Button
                        className="bg-main border-0 text-white cursor-pointer"
                        variant="primary"
                        type="submit"
                        // disable btn if there is errors
                        disabled={!(isValid && dirty)}
                      >
                        Login
                      </Button>
                    </Col>
                  )}
                  <Col md={2}>
                    <Link
                      className={`${styles.ResgisterNow___Btn} text-main `}
                      to={"/Register"}
                    >
                      Register Now
                    </Link>
                  </Col>
                  <Col md={2}>
                    <Link
                      className={`${styles.ResgisterNow___Btn} text-main`}
                      to={"/ForgetPass"}
                    >
                    Forget Password?
                    </Link>
                  </Col>
                </Row>
              </Form>
            </Row>
          </div>
        )}
      </Formik>
      
    </>
  );
}
