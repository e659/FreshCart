import React, { useContext, useState } from "react";
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
import { Link } from "react-router-dom";
import { userContext } from "../Context/userContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import loginImg from "../../Assets/images/lo.jpg";
import "./Login.scss";
export default function Login() {
  // using UserContext
  let { setUserToken } = useContext(userContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  // showHide Password
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
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
          console.log(data);
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
            <Row className="py-5 w-75 reg__row mt-5 flex-column-reverse  flex-md-row">
              <div className="col-md-7 ">
                <h1 className="fs-4 text-main ">Login Now:</h1>
                {error ? (
                  <Col md={12} className="validationBox mt-2 p-2">
                    {error}
                  </Col>
                ) : null}
                <Form onSubmit={handleSubmit} className="mt-5">
                  <Row className="mb-2">
                    <Form.Group md={12} controlId="formGridEmail">
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
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.email}
                      </Col>
                    ) : null}
                  </Row>
                  <Row className="mb-2 position-relative">
                    <Form.Group md={12} controlId="formGridPassword">
                      <Form.Label>password:</Form.Label>
                      <Form.Control
                        type={passwordType}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                    {errors.password && touched.password ? (
                      <Col md={12} className="validationBox mt-2 p-2 ms-3">
                        {errors.password}
                      </Col>
                    ) : null}
                    <button
                      type="button"
                      className="btn border-none eyeBtn w-25 "
                      onClick={togglePassword}
                    >
                      {passwordType === "password" ? (
                        <AiOutlineEyeInvisible size={15} />
                      ) : (
                        <AiOutlineEye size={15} />
                      )}
                    </button>
                  </Row>

                  <Row className="mt-3">
                    {isLoading === true ? (
                      <Col md={4}>
                        <Button
                          className="bg-main border-0 text-white cursor-pointer"
                          variant="primary"
                          type="submit"
                        >
                          {/* <Hourglass
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={["white", "#white"]}
                          /> */}
                        
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
                      <Col md={4}>
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
                    <Col md={4}>
                      <Link className="text-main reg__btn" to={"/Register"}>
                        Register Now
                      </Link>
                    </Col>
                    <Col md={4}>
                      <Link className="text-main reg__btn" to={"/ForgetPass"}>
                        Forget Password?
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="col-md-5 d-flex justify-content-center align-items-center">
                <img
                  src={loginImg}
                  alt="registration"
                  className="img-fluid reg__img"
                />
              </div>
            </Row>
          </div>
        )}
      </Formik>
    </>
  );
}
