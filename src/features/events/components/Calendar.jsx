import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es'; // importa el idioma
import { ChevronLeftIcon, ChevronRightIcon } from "../../common/components/Icons";
dayjs.locale('es'); // lo setea como predeterminado

export const Calendar = ({events:eventData, openEventDetail, openCalendarDayAside}) => {


  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");

  const daysInMonth = endOfMonth.date(); // cuántos días tiene el mes
  const startDay = startOfMonth.day();   // en qué día de la semana empieza (0=Domingo)

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-[120px]"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = currentDate.date(day);
      const dayKey = dateObj.format("YYYY-MM-DD");
      const events = eventData[dayKey] || [];

      // esto tiene que ser <CalendarDays events={} />
      days.push(
        <div
          key={day}
          className="h-[120px] bg-primary"
        >
          <span className="text-xs text-secondary p-1">
              {day}
          </span>

          {events.slice(0, 2).map((event) => (
            <button
              key={event.id}
              className={`${ event.bgColor ? event.bgColor : 'bg-gray-500'} w-full cursor-pointer mb-1 px-1 truncate`}
              onClick={() => openEventDetail(event)}
            >
              {event.title}
            </button>
          ))}

          {events.length > 2 && (
            <button
              className="block mx-auto w-9/10 bg-gray-200 text-blue-500 font-semibold text-center rounded-full text-red-500 cursor-pointer truncate"
              onClick={() => openCalendarDayAside( events )}
            >
              +{events.length - 2} más
            </button>
          )}

        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full border rounded bg-primary">
      <div className="flex justify-between items-center px-4 py-2">
        <button className="cursor-pointer" onClick={handlePrevMonth}>
          <ChevronLeftIcon />
        </button>
        <h2 className="font-bold text-secondary">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button className="cursor-pointer" onClick={handleNextMonth}> 
          <ChevronRightIcon />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-secondary">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-2 gap-[1px] bg-gray-300 border-t">
        {renderDays()}
      </div>
    </div>
  );
};
