import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

import surveyJson from "../questions";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

StylesManager.applyTheme("defaultV2");

const SingleForm = () => {
  const form_id = useParams().testvalue;
  const [questions, setQuestions] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/formquestion/" + form_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setQuestions(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/formdetail/" + form_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      });
  }, []);

  const mandate = {
    title: title,
    description: description,
    elements: questions,
  };
  const survey = new Model(mandate);

  // return ( <div>
  //     {questions &&
  //         questions.map((item)=>{
  //             return <h1 key={item.id}>{item.id}</h1>
  //         })
  //     }
  // </div> );

  const alertResults = useCallback((sender) => {
    let results = sender.data;
    results.form_id = form_id;
    results = JSON.stringify(results);
    console.log("where we");
    console.log(results);
    fetch("http://127.0.0.1:8000/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: results,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        console.log("after lara");
      });
  }, []);

  survey.onComplete.add(alertResults);
  return <Survey model={survey} />;
};

export default SingleForm;
