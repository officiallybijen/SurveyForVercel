import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { editFormElement, removeFormElement } from "../redux/actions";
import Card from "./Card";

const FormElement = ({ element, index, createQuestion, createForm }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(`Question ${index + 1}`);
  const [isRequired, setIsRequired] = useState(false);
  const [dropDownList, setDropDownList] = useState([
    { id: uuidv4(), name: "item1" },
    { id: uuidv4(), name: "item2" },
    { id: uuidv4(), name: "item3" },
  ]);
  const [radioItem, setRadioItem] = useState([
    { id: uuidv4(), name: "item1" },
    { id: uuidv4(), name: "item2" },
    { id: uuidv4(), name: "item3" },
  ]);
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5]);
  const [labelTrue, setLabelTrue] = useState("Yes");
  const [labelFalse, setLabelFalse] = useState("No");

  useEffect(() => {
    const submitFormElement = () => {
      var _formElement = {
        id: element.id,
        type: element.type,
        title: question,
        isRequired,
      };
      switch (element.type) {
        case "text":
          break;
        case "comment":
          break;
        case "radiogroup":
            const opt = [];
            radioItem.forEach((list) =>
              opt.push({ value: list.name, text: list.name })
            );
            _formElement.choices = opt;
            break;  
        case "dropdown":
          const choices = [];
          dropDownList.forEach((list) =>
            choices.push({ value: list.name, text: list.name })
          );
          _formElement.choices = choices;
          break;
        case "rating":
          _formElement.rateValues = ratings;
          break;
        case "boolean":
          _formElement.labelTrue = labelTrue;
          _formElement.labelFalse = labelFalse;
          break;
        default:
          return;
      }
      dispatch(editFormElement(_formElement));
    };

    createForm && submitFormElement();
  }, [createForm]);

  const removeDropdownItem = (id) => {
    if (dropDownList.length > 2) {
      const newList = dropDownList.filter((list) => list.id !== id);
      setDropDownList(newList);
    }
  };

  const removeRadioItem = (id) => {
    if (radioItem.length > 2) {
      const newList = radioItem.filter((list) => list.id !== id);
      setRadioItem(newList);
    }
  };

  const updateDropdownItem = (id, value) => {
    const newList = [];
    dropDownList.forEach((list) =>
      list.id === id ? newList.push({ id, name: value }) : newList.push(list)
    );
    setDropDownList(newList);
  };


  const updateRadioItem = (id, value) => {
    const newList = [];
    radioItem.forEach((list) =>
      list.id === id ? newList.push({ id, name: value }) : newList.push(list)
    );
    setRadioItem(newList);
  };

  const removeRating = () => {
    if (ratings.length > 2) {
      const prevRatings = ratings;
      prevRatings.pop();
      setRatings([...prevRatings]);
    }
  };

  const renderFormElement = () => {
    switch (element.type) {
      case "text":
        return <input type="text" readOnly className="form-control" />;
      case "comment":
        return <textarea readOnly rows="10" className="form-control"></textarea>;
      case "signaturepad":
        return <input type="signaturepad" hidden/>
      case "dropdown":
        return (
          <>
            {dropDownList.map((dropDown) => (
              <div key={dropDown.id} className="d-flex align-items-end mb-3">
                {dropDownList.length > 2 && (
                  <i
                    type="button"
                    className="bi bi-dash-circle"
                    onClick={() => removeDropdownItem(dropDown.id)}
                  />
                )}
                <input
                  className="question-input ms-3"
                  type="text"
                  value={dropDown.name}
                  onChange={(e) =>
                    updateDropdownItem(dropDown.id, e.target.value)
                  }
                />
              </div>
            ))}
            <div className="d-inline-flex">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setDropDownList((prev) => [
                    ...prev,
                    { id: uuidv4(), name: `item${dropDownList.length + 1}` },
                  ])
                }
              >
                <i className="bi bi-plus-circle"></i> Add Item
              </button>
            </div>
          </>
        );
        case "radiogroup":
        return (
          <>
            {radioItem.map((dropDown) => (
              <div key={dropDown.id} className="d-flex align-items-end mb-3">
                {radioItem.length > 2 && (
                  <i
                    type="button"
                    className="bi bi-dash-circle"
                    onClick={() => removeRadioItem(dropDown.id)}
                  />
                )}
                <input
                  className="question-input ms-3"
                  type="text"
                  value={dropDown.name}
                  onChange={(e) =>
                    updateRadioItem(dropDown.id, e.target.value)
                  }
                />
              </div>
            ))}
            <div className="d-inline-flex">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() =>
                  setRadioItem((prev) => [
                    ...prev,
                    { id: uuidv4(), name: `item${radioItem.length + 1}` },
                  ])
                }
              >
                <i className="bi bi-plus-circle"></i> Add Item
              </button>
            </div>
          </>
        );
      case "rating":
        return (
          <>
            <div className="d-flex flex-wrap">
              {ratings.map((rating) => (
                <span
                  key={rating}
                  className="bg-secondary rounded-5 p-3 text-white me-2"
                >
                  {rating}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <i
                type="button"
                className="bi bi-dash-circle fs-3 me-3"
                onClick={() => removeRating()}
              ></i>
              <i
                type="button"
                className="bi bi-plus-circle fs-3"
                onClick={() =>
                  setRatings((prev) => [...prev, ratings.length + 1])
                }
              />
            </div>
          </>
        );
      case "boolean":
        return (
          <span
            className="rounded-5 bg-secondary p-3 d-flex justify-content-between"
            style={{ width: "fitContent" }}
          >
            <input
              className="question-input text-white boolean-input"
              type="text"
              value={labelTrue}
              onChange={(e) => setLabelTrue(e.target.value)}
            />
            <input
              className="question-input text-end text-white boolean-input"
              type="text"
              value={labelFalse}
              onChange={(e) => setLabelFalse(e.target.value)}
            />
          </span>
        );
      default:
        return;
    }
  };

  return (
    <Card className="mb-3 position-relative">
      <button
        className="position-absolute top-0 end-0 btn text-danger"
        onClick={() => dispatch(removeFormElement(element.id))}
      >
        <i className="bi bi-trash3-fill"></i>
      </button>
      <h5>What would you like to ask?</h5>
      <input
        className="question-input my-3"
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {renderFormElement()}
      <div className="d-flex justify-content-end mt-3 align-items-center">
        <button
          className="btn mr-2"
          onClick={() => createQuestion(element.type)}
        >
          <i className="bi bi-window-plus"></i>&nbsp;&nbsp;Duplicate
        </button>
        <div className="form-check form-switch">
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckReverse"
            role="button"
          >
            Required
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckReverse"
            checked={isRequired}
            onChange={() => setIsRequired(!isRequired)}
          />
        </div>
      </div>
    </Card>
  );
};

export default FormElement;
