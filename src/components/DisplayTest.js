import 'survey-core/defaultV2.min.css';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

import surveyJson from '../questions'
import { SurveyPDF } from 'survey-pdf';

StylesManager.applyTheme("defaultV2");

const exportToPdfOptions = {
  fontSize: 12
};

const savePdf = function (surveyData) {
  const surveyPdf = new SurveyPDF(surveyJson, exportToPdfOptions);
  surveyPdf.data = surveyData;
  surveyPdf.save();
};


function App() {
  const survey = new Model(surveyJson);

  survey.addNavigationItem({
    id: "pdf-export",
    title: "Save as PDF",
    action: () => savePdf(survey.data)
  });


  return <Survey model={survey} />;
}

export default App;
