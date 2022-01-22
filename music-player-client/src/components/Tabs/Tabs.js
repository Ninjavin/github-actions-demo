import { baseUrl } from "../../config";
import "./Tabs.css";

const Tabs = ({ tabData, onItemSelect }) => {
  console.log(tabData);
  return (
    <div className="tab-container">
      <div className="tab-contents">
        {tabData && (
          <div className={`tab-content`}>
            <div className="content-wrapper flex justify-center m-20">
              {tabData["freelicense"].items.map((item, _index) => (
                <div
                  onClick={() => onItemSelect(item.key)}
                  key={_index}
                  className="content-item"
                >
                  <img
                    src={`${baseUrl}/music/${item.key}/${item.key}.jpg`}
                    alt=""
                  />
                  <div className="content-label flex justify-center align-center">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
