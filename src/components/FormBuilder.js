import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiStepForm, Step } from "react-multi-form";

import { addFormElement } from "../redux/actions";
import { generateFormType } from "../utils";
import Card from "./Card";
import FormElement from "./FormElement";
import PreviewForm, { hell } from "./PreviewForm";

const FormBuilder = () => {
  const formElements = useSelector((state) => state.formElements);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [showQuestionType, setShowQuestionType] = useState(false);
  const [createForm, setCreateForm] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState(false);

  const createQuestion = (type) => {
    setShowQuestionType(false);
    const newQuestion = generateFormType(type);
    dispatch(addFormElement(newQuestion));
  };

  const nextStep = () => {
    if (
      (activeStep === 2 && formElements.length < 1) ||
      (activeStep === 1 && title === "")
    ) {
      setError(true);
    } else {
      setError(false);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <MultiStepForm activeStep={activeStep} accentColor="#95cdf5">
          <Step label="Title and description">
            <Card className="mt-5 mb-3">
              <div className="mb-4">
                <label htmlFor="fromTitle" className="form-label">
                  Form Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Eg. Register new user"
                  id="fromTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="formDescription" className="form-label">
                  Form Description
                </label>
                <textarea
                  className="form-control"
                  required
                  id="formDescription"
                  placeholder="Eg. Form to create register new user"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </Card>
            {error && (
              <h5 className="text-danger text-center">
                *** Title field is required
              </h5>
            )}
          </Step>

          <Step label="Form">
            {formElements?.map((formElement, index) => (
              <FormElement
                key={formElement.id}
                element={formElement}
                index={index}
                createQuestion={createQuestion}
                createForm={createForm}
              />
            ))}
            {showQuestionType && (
              <Card className="mt-3 position-relative">
                <button
                  className="position-absolute top-0 end-0 btn"
                  onClick={() => setShowQuestionType(false)}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
                <h5>Select question type</h5>
                <div className="row">
                  <div className="col-12 col-md-6 my-1 d-grid">
                    <button
                      className="card p-2"
                      onClick={() => createQuestion("text")}
                    >
                      <h6>Text question</h6>
                    </button>
                  </div>
                  <div className="col-12 col-md-6 my-1 d-grid">
                    <button
                      className="card p-2"
                      onClick={() => createQuestion("dropdown")}
                    >
                      <h6>Dropdown</h6>
                    </button>
                  </div>

                  <div className="col-12 col-md-6 my-1 d-grid">
                    <button
                      className="card p-2"
                      onClick={() => createQuestion("boolean")}
                    >
                      <h6>Boolean, Yes/No, True/False</h6>
                    </button>
                  </div>
                  <div className="col-12 col-md-6 my-1 d-grid">
                    <button
                      className="card p-2"
                      onClick={() => createQuestion("comment")}
                    >
                      <h6>Comment</h6>
                    </button>
                  </div>

                  <div className="col-12 col-md-6 my-1 d-grid">
                    <button
                      className="card p-2"
                      onClick={() => createQuestion("radiogroup")}
                    >
                      <h6>Radio</h6>
                    </button>
                  </div>
                </div>
              </Card>
            )}

            <div
              className="d-flex justify-content-center flex-row mt-3"
              style={{ marginBottom: "5rem" }}
            >
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowQuestionType(true);
                  setCreateForm(false);
                  setError(false);
                }}
              >
                + Add Question
              </button>
            </div>

            {error && (
              <h5 className="text-danger text-center">
                *** Add at least one question
              </h5>
            )}
          </Step>

          <Step label="confirmation">
            <h1 className="my-5 text-center">Confirmation</h1>
            <h4 className="text-center">
              Click 'Previous' to edit form. Click 'Create Form' to continue.
            </h4>
            <div className="mb-3">
              <PreviewForm
                title={title}
                description={description}
                setCreateForm={setCreateForm}
              />
            </div>
          </Step>
        </MultiStepForm>

        <div style={{ marginBottom: "5rem" }}>
          {activeStep !== 1 && (
            <button
              className="btn btn-secondary"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              <i className="bi bi-arrow-left"></i> Previous
            </button>
          )}
          {activeStep !== 3 && (
            <button
              className="btn btn-secondary"
              onClick={nextStep}
              style={{ float: "right" }}
            >
              Next <i className="bi bi-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
      {formElements?.length > 0 && (
        <>
          <div className="bg-dark position-fixed bottom-0 create-section p-3">
            <div className="container d-flex justify-content-end">
              <button
                className="btn btn-success me-1"
                onClick={() => setCreateForm(true)}
                data-bs-toggle="modal"
                data-bs-target="#previewFormModal"
              >
                Preview
              </button>
              <button className="btn btn-success me-1" onClick={() => hell()}>
                Create Form
              </button>
            </div>
          </div>

          <div className="modal fade" id="previewFormModal">
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Form Preview</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <PreviewForm
                    title={title}
                    description={description}
                    setCreateForm={setCreateForm}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormBuilder;
