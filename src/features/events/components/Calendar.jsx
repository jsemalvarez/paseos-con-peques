import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es'; // importa el idioma
dayjs.locale('es'); // lo setea como predeterminado

export const Calendar = () => {
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
      days.push(
        <div
          key={day}
          className="h-[120px] bg-primary"
        >
            <span className="text-xs text-secondary p-1">
                {day}
            </span>
            <div className="h-[25px] bg-blue-500 cursor-pointer mb-1 overflow-hidden px-1"> nombre muy muy muy muy largo</div>
            <div className="h-[25px] bg-red-500 cursor-pointer mb-1"></div>
            <div className="h-[25px] bg-gray-100 rounded-full cursor-pointer flex justify-center mx-1 font-semibold text-red-500">3 más</div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full border rounded">
      <div className="flex justify-between items-center px-4 py-2">
        <button className="cursor-pointer" onClick={handlePrevMonth}>←</button>
        <h2 className="font-bold text-secondary">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button className="cursor-pointer" onClick={handleNextMonth}>→</button>
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
