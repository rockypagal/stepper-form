import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import StepperOne from "./Components/StepperOne";
import StepperTwo from "./Components/StepperTwo";
import StepperThree from "./Components/StepperThree";
function App() {
  const [pop_up, setPop_up] = useState(false);
  const [formHeight, setFormHeight] = useState();

  const [showStepOne, setShowStepOne] = useState(0);
  const formRef = useRef(null);
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    message: "",
    doc_file: "",
    img_file: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required().min(3, "name must be 3 characters long"),
    email: yup
      .string()
      .required()
      .matches(
        /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
        "please enter a valid email"
      ),
    phone: yup
      .string()
      .required()
      .matches(/^[789]\d{9}$/, "Please enter valid number"),
    birthdate: yup.date().required(),
    address: yup.string().required().min(3, "please enter a valid address"),
    pincode: yup.string().required().min(6, "please enter a valid pincode"),
    city: yup.string().required().min(2, "please enter valid city name"),
    state: yup.string().required().min(2, "please enter valid state"),
    country: yup.string().required().min(2, "please enter valid country"),
    message: yup
      .string()
      .required()
      .max(150)
      .min(2, "please enter valid message"),
    doc_file: yup.mixed().required("please select document file"),
    img_file: yup.mixed().required("please select image file"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (state, { resetForm }) => {
      console.log(state);
      resetForm();
      setShowStepOne(0);
      setPop_up(false);
    },
  });

  function showFormFields() {
    switch (showStepOne) {
      case 0:
        return <StepperOne formik={formik} setShowStepOne={setShowStepOne} />;
      case 1:
        return <StepperTwo formik={formik} setShowStepOne={setShowStepOne} />;
      case 2:
        return <StepperThree formik={formik} setShowStepOne={setShowStepOne} />;
      default:
        return setPop_up(false);
    }
  }

  useEffect(() => {
    pop_up && setFormHeight(formRef.current.getBoundingClientRect().height);
  });

  

  const handleFormMove = (event) => {
    switch (event) {
      case "address":
        formik.values.name &&
          formik.values.email &&
          formik.values.phone &&
          formik.values.birthdate &&
          !formik.errors.name &&
          !formik.errors.email &&
          !formik.errors.phone &&
          !formik.errors.birthdate &&
          setShowStepOne(1);
        break;

      case "photos":
        formik.values.address &&
          formik.values.pincode &&
          formik.values.city &&
          formik.values.state &&
          formik.values.country &&
          formik.values.message &&
          !formik.errors.address &&
          !formik.errors.pincode &&
          !formik.errors.city &&
          !formik.errors.country &&
          !formik.errors.state &&
          !formik.errors.message &&
          showStepOne === 1 &&
          setShowStepOne(2);
        break;
    }
  };

  return (
    <div className="App">
      <main>
        <button className="open_popup" onClick={() => setPop_up(!pop_up)}>
          <span className="material-symbols-outlined">app_registration</span>
        </button>

        {pop_up && (
          <div className="pop-up">
            <div className="form-container">
              <div
                className={
                  formHeight > 480
                    ? "count-steps activeFormBorder"
                    : "count-steps "
                }
              >
                <div
                  className="user-details"
                  onClick={() => {
                    if (showStepOne > 0) setShowStepOne(0);
                  }}
                >
                  <span className={showStepOne >= 0 ? "active" : ""}></span>
                  <span>User Details</span>
                </div>

                <span
                  className={showStepOne >= 1 ? "line line-bg" : "line"}
                ></span>
                <span
                  className={showStepOne >= 2 ? "line2 line-bg" : "line2"}
                ></span>

                <div
                  className="address"
                  onClick={() => {
                    // if (showStepOne >= 0) setShowStepOne(1);
                    handleFormMove("address");
                  }}
                >
                  <span className={showStepOne >= 1 ? "active" : ""}></span>
                  <span>User Address</span>
                </div>

                <div
                  className="photo"
                  onClick={() => {
                    handleFormMove("photos");
                  }}
                >
                  <span className={showStepOne >= 2 ? "active" : ""}></span>
                  <span>Upload Photo</span>
                </div>

                <button
                  className="close_popup"
                  onClick={() => setPop_up(!pop_up)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="form-section" ref={formRef}>
                <form
                  className="login-form-main"
                  onSubmit={formik.handleSubmit}
                >
                  {showFormFields()}
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
