import { useParams } from "react-router-dom";

const AnswerPage = () => {
    const form_id = useParams().testvalue
    return ( <div>
        {form_id}
    </div> );
}
 
export default AnswerPage;