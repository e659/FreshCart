import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
export default function ResetPass() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    //  validation using yup
    const ResetPassSchema = Yup.object().shape({
  
      email: Yup.string().email("Invalid email").required("Required"),
      newPassword: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{5,10}$/,
          "password must start with capital letter & min(5) & max(10)"
        )
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
          email: "",
         newPassword:"",
       
        }}
        // validation
        validationSchema={ResetPassSchema}
        // send data to backend
        onSubmit={async (values) => {
          setIsLoading(true);
          let { data } = await axios
          .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
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
              <h1 className="fs-4">Reset Password</h1>
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
                       <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>new password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.newPassword && touched.newPassword ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.newPassword}
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
                          Reset
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Row>
              </Form>
            </Row>
          </div>
        )}
      </Formik>
    </>
  )
}
