import React from "react";
import { Formik } from "formik";

function Form({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik
      tsetID="form"
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
