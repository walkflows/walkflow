import Image from "next/image";
import { formatPrice, type Property } from "@/content/real-estate-properties";
import { ButtonEl } from "@/components/ui/Button";
import { PropertyThumb } from "@/components/ui/illustrations";

export function PropertyCard({
  property,
  onViewDetails,
  onBookViewing,
}: {
  property: Property;
  onViewDetails: (id: string) => void;
  onBookViewing: (id: string) => void;
}) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20">
      <div className="relative aspect-[4/3]">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <PropertyThumb propertyType={property.propertyType} className="h-full w-full" />
        )}
        <span
          className={
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold " +
            (property.status === "Available" ? "bg-white/90 text-navy-deep" : "bg-orange text-navy-deep")
          }
        >
          {property.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg text-white">{property.name}</h3>
        <p className="mt-1 text-sm text-white/60">
          {property.neighbourhood} · {property.propertyType} · {property.listingType === "buy" ? "For sale" : "To rent"}
        </p>
        <p className="mt-3 text-xl font-heading font-medium text-white">{formatPrice(property)}</p>
        <p className="mt-1 text-sm text-white/60">
          {property.bedrooms} bedroom{property.bedrooms === 1 ? "" : "s"} · {property.bathrooms} bathroom
          {property.bathrooms === 1 ? "" : "s"}
        </p>
        <div className="mt-5 flex flex-1 items-end gap-2.5">
          <ButtonEl variant="secondary-on-dark" size="sm" className="flex-1" onClick={() => onViewDetails(property.id)}>
            View details
          </ButtonEl>
          <ButtonEl size="sm" className="flex-1" onClick={() => onBookViewing(property.id)}>
            Book viewing
          </ButtonEl>
        </div>
      </div>
    </li>
  );
}
