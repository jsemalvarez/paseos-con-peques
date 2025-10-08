import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../common/components/Icons";
import { CloudinaryImage } from "../../../common/components/CloudinaryImage";

export const FeaturedEvents = ({ events, openEventDetail }) => {
    const scrollContainerRef = useRef(null);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const upcomingEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        const isUpcoming = eventDate >= todayStart;
        const isFeatured = event.isFeatured;

        return isUpcoming && isFeatured;
    });

  if (upcomingEvents.length === 0) {
    return null
  }

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 250; // píxeles a mover por clic
    const delta = direction === "left" ? -scrollAmount : scrollAmount;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="relative w-full max-w-[1600px] mx-auto mb-6">
      {/* Título */}
      <h2 className="text-3xl text-center font-semibold mb-2">
        EVENTOS DESTACADOS
      </h2>

      {/* Contenedor del carrusel */}
      <div className="relative">
        {/* Botón izquierdo */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-primary shadow-md rounded-full p-2 z-10 hover:scale-105 transition cursor-pointer"
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeftIcon />
        </button>

        {/* Lista de eventos */}
        <div
          ref={scrollContainerRef}
          className="mx-auto w-9/10 flex gap-4 overflow-x-auto py-2 px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="min-w-[180px] max-w-[180px] flex-shrink-0 cursor-pointer"
              onClick={() => openEventDetail(event)}
            >
                <div className="bg-gradient-to-b from-primary to-gray-100 shadow-lg shadow-cyan-500/50 p-[2px] flex justify-center items-center rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 snap-start">
                    <CloudinaryImage 
                        publicId={ event.photoId }
                        alt={ event.title }
                        className="h-[320px] object-cover rounded-xl "
                    />
                </div>

              <div className="p-3">
                <h3 className="text-sm truncate text-gray-200 text-center">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Botón derecho */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-primary shadow-md rounded-full p-2 z-10 hover:scale-105 transition cursor-pointer"
          aria-label="Desplazar a la derecha"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </section>
  );
}
