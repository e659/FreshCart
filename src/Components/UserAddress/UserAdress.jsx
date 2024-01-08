import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import { ColorRing } from "react-loader-spinner";
import { userContext } from "../Context/userContext";
import { useDispatch, useSelector } from "react-redux";
import payImg from "../../Assets/images/c.jpg";
import { Helmet } from "react-helmet";
export default function UserAdress() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let { onlinePayment } = useContext(userContext);
  const cartId = useSelector((state) => state.addToCart.cart.data._id);
  console.log("cartId:", cartId);
  //  validation using yup
  const paySchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        // inputsData
        initialValues={{
          details: "",
          phone: "",
          city: "",
        }}
        // validation
        validationSchema={paySchema}
        // send data to backend
        onSubmit={async (values) => {
          setIsLoading(true);
          let res = await onlinePayment(
            cartId,
            "https://freshh-cart.vercel.app",
            values
          );
          console.log(res);
          // navigate to stripe paymentGate
          window.location.href = res.data.session.url;
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
            <Helmet>
              <title>Online Address Form</title>
              <meta name="description" content="Online Address Form Page" />
            </Helmet>
            <Row className="py-5 w-75 reg__row mt-5">
              <div className="col-md-5">
                <img src={payImg} alt="payment" className="img-fluid" />
              </div>
              <div className="col-md-7">
                <h1 className="fs-4 text-main">Payment Details:</h1>
                {error ? (
                  <Col md={12} className="validationBox mt-2 p-2">
                    {error}
                  </Col>
                ) : null}
                <Form className="" onSubmit={handleSubmit}>
                  <Row className="mb-2">
                    <Form.Group md={12} controlId="formGridName">
                      <Form.Label>Address details:</Form.Label>
                      <Form.Control
                        type="name"
                        name="details"
                        value={values.details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    {errors.details && touched.details ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.details}
                      </Col>
                    ) : null}
                  </Row>
                  <Row className="mb-2">
                    <Form.Group md={12} controlId="formGridEmail">
                      <Form.Label>city:</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    {errors.city && touched.city ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.city}
                      </Col>
                    ) : null}
                  </Row>
                  <Row className="mb-2">
                    <Form.Group md={12} controlId="formGridPassword">
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
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
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
                          <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={[
                              "#e15b64",
                              "#f47e60",
                              "#f8b26a",
                              "#abbd81",
                              "#849b87",
                            ]}
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
                          Checkout
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Form>
              </div>
            </Row>
          </div>
        )}
      </Formik>
    </>
  );
}
