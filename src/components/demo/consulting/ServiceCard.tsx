import Image from "next/image";
import type { SessionService } from "@/content/consulting-services";
import { ButtonEl } from "@/components/ui/Button";

type CardItem = SessionService | { id: "custom-project"; name: string; description: string; image: string };

export function ServiceCard({
  service,
  isCustomProject,
  onViewDetails,
  onArrange,
}: {
  service: CardItem;
  isCustomProject: boolean;
  onViewDetails: (id: string) => void;
  onArrange: (id: string) => void;
}) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20">
      <div className="relative aspect-[4/3]">
        {service.image && (
          <Image src={service.image} alt={service.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg text-white">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{service.description}</p>
        {!isCustomProject && "price" in service && (
          <p className="mt-3 text-sm font-semibold text-orange">
            US${service.price} · {service.durationMinutes} min
          </p>
        )}
        <div className="mt-5 flex flex-1 items-end gap-2.5">
          {!isCustomProject && (
            <ButtonEl variant="secondary-on-dark" size="sm" className="min-w-0 flex-1 text-center leading-tight" onClick={() => onViewDetails(service.id)}>
              View Details
            </ButtonEl>
          )}
          <ButtonEl size="sm" className="min-w-0 flex-1 text-center leading-tight" onClick={() => onArrange(service.id)}>
            {isCustomProject ? "Discuss Custom Project" : "Arrange Session"}
          </ButtonEl>
        </div>
      </div>
    </li>
  );
}
