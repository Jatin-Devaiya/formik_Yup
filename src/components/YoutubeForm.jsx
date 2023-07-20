import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import Error from "./Error";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phone: ["", ""],
  phNumber: [""],
};
const onSubmit = (values,onsubmitProps) => {
  console.log("Form Value..........", values);
  onsubmitProps.resetForm()
};

const validationSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Required!!!"),
  email: Yup.string().email("Invalid Email Format...").required("Required!!!"),
  channel: Yup.string().required("Required!!!"),
  address:Yup.string().required("Required!!!"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "required";
  }
  return error;
};

const YoutubeForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}

      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        console.log("formik props", formik);

        return (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name :
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component={Error} />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email :
              </label>
              <Field
                id="email"
                className="form-control"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email">
                {(errormsg) => <div style={{ color: "red" }}>{errormsg}</div>}
              </ErrorMessage>
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                channel :
              </label>
              <Field
                id="channel"
                name="channel"
                type="text"
                className="form-control"
                placeholder="Enter your Channel Name"
              />
              <ErrorMessage name="channel" component={Error} />
            </div>

            <div className="mb-3">
              <label htmlFor="comments" className="form-label">
                Comments :
              </label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                type="text"
                className="form-control"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={Error} />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address :
              </label>
              <FastField name="address" type="text" className="form-control">
                {(props) => {
                  const { field, form, meta } = props;
                  {
                    console.log("render field");
                  }
                  return (
                    <div>
                      <input
                        type="text"
                        id="address"
                        {...field}
                        className="form-control"
                      />
                      {/* {meta.touched && meta.error ? (
                        <div >{meta.error}</div>
                      ) : null} */}
                    </div>
                  );
                }}
              </FastField>
              <ErrorMessage name="address" component={Error} />
            </div>

            <div className="mb-3">
              <label htmlFor="facebook" className="form-label">
                Facebok Profile :
              </label>
              <Field
                id="facebook"
                name="social.facebook"
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="twitter" className="form-label">
                Twitter Profile :
              </label>
              <Field
                id="twitter"
                name="social.twitter"
                type="text"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="primaryph" className="form-label">
                Primary Phone Number :
              </label>
              <Field
                id="primaryph"
                name="phone[0]"
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="secondaryph" className="form-label">
                Secondary Phone Number :
              </label>
              <Field
                id="secondaryph"
                name="phone[1]"
                type="number"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">List of Phone Number :</label>
              <FieldArray name="phNumber" className="form-control">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumber } = values;
                  console.log("form Errors", form.errors);
                  return (
                    <>
                      {phNumber.map((number, index) => (
                        <div key={index}>
                          <Field name={`phNumber[${index}]`} type="number" />
                          {index > 0 && (
                            <button onClick={() => remove(index)} type="button">
                              -{" "}
                            </button>
                          )}

                          {index === 0 && (
                            <button onClick={() => push("")} type="button">
                              +{" "}
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  );
                }}
              </FieldArray>
            </div>

            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button>

            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,

                  comments: true,
                })
              }
            >
              Visit fields
            </button>

            <button type="reset">reset</button>

            <button
              type="submit"
              // disabled={!formik.isValid}
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default YoutubeForm;
