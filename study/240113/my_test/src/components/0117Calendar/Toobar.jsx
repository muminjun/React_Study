import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import moment from 'moment';

function Toolbar(props) {
  const {
    date,
  } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <div>
          <button type="button" onClick={navigate.bind(null, 'PREV')}>
            <FaArrowAltCircleLeft />
          </button>
          <span>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</span>
          <button type="button" onClick={navigate.bind(null, 'NEXT')}>
            <FaArrowAltCircleRight />
          </button>
        </div>
        
        <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          {moment().format('D')}
        </button>
      </span>
    </div>
  );
}

export default Toolbar