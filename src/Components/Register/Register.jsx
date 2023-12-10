import React, { useState } from "react";
import styles from "./Register.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //  validation using yup
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must start with capital letter & min(5) & max(10)"
      )
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "not match")
      .required("Required"),
  });
  // navigateTo Login
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Formik
        // inputsData
        initialValues={{
          name: "",
          email: "",
          password: "",
          rePassword: "",
          phone: "",
        }}
        // validation
        validationSchema={SignupSchema}
        // send data to backend
        onSubmit={async (values) => {
          setIsLoading(true);
          let { data } = await axios
            .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            // handel error if request faild
            .catch((err) => {
              setIsLoading(false);
              setError(err.response.data.message);
            });
          console.log(data);
          if (data.message === "success") {
            // navigateTo Login
            navigateToLogin();
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
              <h1 className="fs-4">Register Now:</h1>
              {error ? (
                <Col md={12} className="validationBox mt-2 p-2">
                  {error}
                </Col>
              ) : null}
              <Form className="" onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>name:</Form.Label>
                    <Form.Control
                      type="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.name && touched.name ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.name}
                    </Col>
                  ) : null}
                </Row>
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
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridrePassword">
                    <Form.Label>rePassword:</Form.Label>
                    <Form.Control
                      type="password"
                      name="rePassword"
                      value={values.rePassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.rePassword && touched.rePassword ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.rePassword}
                    </Col>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Label>phone:</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.phone && touched.phone ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.phone}
                    </Col>
                  ) : null}
                </Row>

                <Row className="mt-3">
                  {isLoading === true ? (
                    <Col md={1}>
                      <Button
                        className="bg-main border-0 text-white "
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
                        className="bg-main border-0 text-white "
                        variant="primary"
                        type="submit"
                        // disable btn if there is errors
                        disabled={!(isValid && dirty)}
                      >
                        Register
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form>
            </Row>
          </div>
        )}
      </Formik>
    </>
  );
}
