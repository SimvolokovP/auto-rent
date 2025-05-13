import { FC, useEffect, useState } from "react";
import { IRecord } from "../models/IRecord";

import "./RecordsList.scss";
import { formatDateTime } from "../../helpers/formatDateTime";
import { getColorByStatus } from "../../helpers/getColorByStatus";
import Tooltip from "../../UI/Tooltip/Tooltip";

interface RecordsListProps {
  records: IRecord[] | null;
}

const RecordsList: FC<RecordsListProps> = ({ records }) => {
  const [recordsList, setRecordsList] = useState<IRecord[] | null>(null);

  useEffect(() => {
    const reversedRecords = records ? [...records].reverse() : null;

    if (reversedRecords) {
      setRecordsList(reversedRecords);
    }
  }, [records]);

  const getTooltipText = (record: IRecord) => {
    switch (record.status) {
      case "C":
        return "cancelled";
      case "R":
        return "rejected";
      case "A":
        return "active";
      default:
        return "pending";
    }
  };

  return (
    <ul className="records-list">
      {recordsList &&
        recordsList.map((record) => (
          <li className="records-list__item">
            <div className="records-item__left">
              <div className="records-item__date">
                {formatDateTime(record.recording_date)}
              </div>
              <div className="records-item__service">
                Service: {record.service.name} // ${record.service.price}
              </div>
            </div>
            <div className="records-item__right">
              <Tooltip title={`Your record is ${getTooltipText(record)}`}>
                <div
                  className="records-item__status"
                  style={{ backgroundColor: getColorByStatus(record.status) }}
                ></div>
              </Tooltip>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default RecordsList;
