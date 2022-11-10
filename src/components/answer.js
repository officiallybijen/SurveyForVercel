import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../url";

const Answer = () => {
    const [allForm, setAllForm] = useState();

    useEffect(() => {
      fetch(url+"/api/allform", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        "ngrok-skip-browser-warning": "1",
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
        {allForm &&
          allForm.map((item) => {
            let id=item.id
            id=id.toString()
            return (
              <div key={item.id}>
                <Link to={id}>
                  {item.id}. <span>{item.title}</span>
                </Link>
              </div>
            );
          })}
      </div>
    );
}
 
export default Answer;