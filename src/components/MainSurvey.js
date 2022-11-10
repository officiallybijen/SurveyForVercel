import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { url } from "../url";
export const surveyResults = [];

function MainSurvey() {
  const [allForm, setAllForm] = useState();

  useEffect(() => {
    fetch(url+"/api/allform", {
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
        setAllForm(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      {allForm &&
        allForm.map((item, index) => {
          let id = item.id;
          id = id.toString();
          return (
            <div className="text-start ms-5" key={item.id}>
              <Link className="fs-1 text-decoration-none" to={id}>
                {index + 1}. <span>{item.title}</span>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
export default MainSurvey;
