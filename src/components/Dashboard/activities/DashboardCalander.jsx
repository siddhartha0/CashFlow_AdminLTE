import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalanderData from "../../../const/customhooks/useCalanderData";
import { useCallback, useState } from "react";
import ModalLayout from "../../../const/widget_component_model/components/ModalLayout";
import useCloseFromOutSideClick from "../../../const/customhooks/useCloseFromOutsideClick";
import DisplayCalendarData from "./DisplayCalendarData";

const localizer = momentLocalizer(moment);

export default function DashboardCalander() {
  const { data } = useCalanderData();
  const [selectedEvent, setSelectedEvent] = useState();
  const [showDetails, setshowDetails] = useState(false);
  const clickfromOutsideRef = useCloseFromOutSideClick(() =>
    setshowDetails(false)
  );

  const onSelectSlot = useCallback((slotInfo) => {
    console.log(slotInfo);
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    setshowDetails(true);
    setSelectedEvent(calEvent);
  }, []);

  return (
    <div>
      <Calendar
        popup
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={onSelectSlot}
        selectable
        onSelectEvent={onSelectEvent}
      />
      {showDetails && (
        <ModalLayout
          ref={clickfromOutsideRef}
          color={selectedEvent.type === "deposit" ? "#FFE15D" : "#DC3545"}
          size="small"
        >
          <DisplayCalendarData props={selectedEvent} />
        </ModalLayout>
      )}
    </div>
  );
}
