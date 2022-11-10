import "survey-core/modern.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { SurveyPDF } from "survey-pdf";
import { addResult } from "../redux/actions";

StylesManager.applyTheme("modern");

const exportToPdfOptions = {
  fontSize: 12,
};

export const surveyResults = [];
export let hell = () => {};
function PreviewForm({ title, description, setCreateForm }) {
  const dispatch = useDispatch();
  const formElements = useSelector((state) => state.formElements);
  const [surveyJson, setSurveyJson] = useState({});

  const savePdf = function (surveyData) {
    const surveyPdf = new SurveyPDF(surveyJson, exportToPdfOptions);
    surveyPdf.data = surveyData;
    surveyPdf.save();
  };

  useEffect(() => {
    setSurveyJson({
      title,
      description,
      elements: formElements,
    });

    setCreateForm(false);
  }, [title, description, formElements]);

  const survey = new Model(surveyJson);

  survey.addNavigationItem({
    id: "pdf-export",
    title: "Save as PDF",
    action: () => savePdf(survey.data),
  });

  hell = () => {
    let ques = { title: title, description: description };
    fetch("http://127.0.0.1:8000/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1",
    },
      body: JSON.stringify(ques),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(formElements);

        let temp = formElements.map((item) => {
          item["SurveyForm_id"] = data.id;
          fetch("http://127.0.0.1:8000/api/question", {
            method: "POST",
            headers: { "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
            body: JSON.stringify(item),
          }).then((res) => {
              return res.json()
          }).then((data)=>{
            console.log(data)
          });
        });
        alert("Form created")
    });
  };

  // let temp = formElements.map((item) => {
  //   item["SurveyForm_id"] = "babu";
  //   let a = JSON.stringify(item);
  //   console.log("finaler", a);
  // });

  //  let temp = formElements.map((item)=>{
  //   fetch("http://127.0.0.1:8000/api/question", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(item),
  //   }).then(() => {
  //   });
  // })

  // console.log(temp);
  const alertResults = useCallback((sender) => {
    // const results = JSON.stringify(sender.data);
    // dispatch(addResult(results))
    // alert(results);
  }, []);

  survey.onComplete.add(alertResults);
  return <Survey model={survey} id="surveyContainer" />;
}

export default PreviewForm;
