import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Formik } from 'formik';
import { Form, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import '../../../App.css';
import classes from "../../../styles/login.module.css";
import { useLoginMutation } from "../../../api/auth";
import appConstant from "../../../constants/appConstant";
import colors from "../../../constants/colors";

const Login = (props) => {

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isError, status }] = useLoginMutation();

  const informationFormValidation = Yup.object().shape({
    username: Yup.string().required('Email is Required'),
    password: Yup.string().required('Password is Required'),
  });

  const handleSubmit = async (values) => {
    setError("");
    const data = await login(
      values
    );
    if (data.data.status === 200) {
      if (data?.data?.result?.role === 'user') {
        onStopUserQuery(false);
        actions.auth.setCurrentUser(data?.data?.result);
        actions.auth.setLoading(data.isLoading);
        actions.auth.setToken(data?.data?.result?.token);
        localStorage.setItem('token', data?.data?.result?.token);
        toast.success(`${data?.data?.message}`);
        navigate("/dashboard");
      } else {
        toast.error(`This user does not have admin rights`);
      }
    } else {
      if (data?.status === 401 || data?.data?.status === 401) {
        toast.error(`${data?.data?.message}`);
      } else {
        toast.error(`Something went wrong`);
      }
    }
  };

  return (
    <>
      <div className={classes.main-div}>
        <div className={classes.mainForm}>
          <Formik
            enableReinitialize
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={informationFormValidation}
            onSubmit={(values) => {
              handleSubmit(values);
            }}>
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, dirty }) => (
              <Form
                onSubmit={handleSubmit}
                role="form"
                className={classes.validationFormContainer}
              >
                <div>
                  <div className={classes.newValidationForm}>
                    <Form.Group>
                      <Row className={classes.newElementFormRow}>
                        <Col xl={12} className={classes.relative}>
                          <Form.Control
                            type="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username"
                            className={classes.elementFormInput}
                            placeholder="Email"
                          />
                        </Col>
                        <Col xl={12} className={classes.errors}>
                          {errors.username && touched.username && (
                            <div className={classes.errorText}>{errors.username} </div>
                          )}
                        </Col>
                      </Row>
                      <Row className={classes.newElementFormRow}>
                        <Col xl={12} className={classes.relative}>
                          <Form.Control
                            type={showPassword ? "password" : "text"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            className={classes.elementFormInput}
                            placeholder="Password"
                          />
                          {showPassword ?
                            <AiOutlineEyeInvisible className={classes.icon} onClick={() => setShowPassword(!showPassword)} />
                            :
                            <AiOutlineEye className={classes.icon} onClick={() => setShowPassword(!showPassword)} />
                          }
                        </Col>
                        <Col xl={12} className={classes.errors}>
                          {errors.password && touched.password && (
                            <div className={classes.errorText}>{errors.password} </div>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className={classes.forgot} >{appConstant.forgotPassword}</div>
                        </Col>
                      </Row>
                    </Form.Group>

                    <Row className={classes.newValidationFormRow}>
                      <Col xl={12}>
                        {error && (
                          <div className={classes.loginError}>
                            {error}
                          </div>
                        )}
                        <div style={{ marginTop: '50px' }}>
                          <button type="submit" className={classes.loginBtn}>{appConstant.login}</button>
                        </div>
                        <div className={classes.signup-text}>
                          <div style={{ color: colors.lightDray }}>{appConstant.DontHaveAccount} <span className={classes.signup} >{appConstant.signUpNow}</span></div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default Login;
