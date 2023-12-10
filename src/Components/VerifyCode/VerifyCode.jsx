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

export default function VerifyCode() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //  validation using yup
  const verifyCodeSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^[0-9]{1,}$/, "Reset Code is invalid")
      .required("Reset Code is required"),
  });
  return (
    <>
      <Formik
        // inputsData
        initialValues={{
          code: "",
        }}
        // validation
        validationSchema={verifyCodeSchema}
        // ApiCall
        onSubmit={async (values) => {
          setIsLoading(true);
          let { data } = await axios
            .post(
              "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
              values
            )
            .catch((err) => {
              setIsLoading(false);
              setError(err.response.data.message);
              navigate("/ResetPass");
            });
          setIsLoading(false);
          navigate("/ResetPass");
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
          <div className="container d-flex justify-content-center">
            <Row className="py-4 w-75">
              <h1 className="fs-4">Reset code</h1>
              {error ? (
                <Col md={12} className="validationBox mt-2 p-2">
                  {error}
                </Col>
              ) : null}
              <Form onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>code:</Form.Label>
                    <Form.Control
                      type="number"
                      name="code"
                      value={values.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {errors.code && touched.code ? (
                    <Col md={12} className="validationBox mt-2 p-2">
                      {errors.code}
                    </Col>
                  ) : null}
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
                          Send
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
  );
}
