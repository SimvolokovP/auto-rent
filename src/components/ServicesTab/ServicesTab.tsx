import { FC, useEffect, useState } from "react";
import { IService } from "../models/IService";
import { ServiceService } from "../../api/ServiceService";
import { useAlert } from "../../UI/Alert";
import Skeleton from "../../UI/Skeleton/Skeleton";

import "./ServicesTab.scss";

interface ServicesTabProps {
  currentService: number | null;
  setCurrentService: (s: number) => void;
}

const ServicesTab: FC<ServicesTabProps> = ({
  currentService,
  setCurrentService,
}) => {
  const [servicesList, setServicesList] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { alert } = useAlert();

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const gettedServices = await ServiceService.getAll();
      setServicesList(gettedServices.data);
    } catch (error) {
      alert({
        message: "Services Error",
        title: "Error",
        type: "error",
        autoClose: true,
        delay: 100,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Skeleton isActive={isLoading}>
      <ul className="services-tab">
        {servicesList.map((service) => (
          <li
            className={`services-tab__item ${
              service.id === currentService ? "active" : ""
            }`}
            onClick={() => setCurrentService(service.id)}
            key={service.id}
          >
            <div className="services-tab__item--name">{service.name}</div>
            <div className="services-tab__item--price">${service.price}</div>
          </li>
        ))}
      </ul>
    </Skeleton>
  );
};

export default ServicesTab;
