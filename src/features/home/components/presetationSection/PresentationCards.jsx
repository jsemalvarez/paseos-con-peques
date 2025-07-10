import { CalendarIcon, LocationIcon, SearchIcon } from "../../../common/components/Icons";
import { PresentationItemCard } from "./PresentationItemCard";

const presentationCards = [
  {
    text: "¿Tenés ganas de salir con los niños y no sabés a dónde ir?",
    icon: <LocationIcon style="w-10 h-10 text-pink-900" />,
  },
  {
    text: "¿Buscás planes para pasear con tus sobrinos?",
    icon: <CalendarIcon style="w-10 h-10 text-pink-900" />,
  },
  {
    text: "¿Querés encontrar ese lugar que todos están mencionando?",
    icon: <SearchIcon style="w-10 h-10 text-pink-900" />,
  },
];

export const PresentationCards = () => {
  return (
    <div className="px-4 py-8 flex flex-wrap justify-center gap-6 w-full max-w-5xl">
        {presentationCards.map((item, id) => (
          <PresentationItemCard
            key={id}
            icon={item.icon}
            text={item.text}
          />
        ))}
      </div>
  )
}
