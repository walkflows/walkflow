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
    <li className="flex flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-[0_1px_2px_rgba(19,35,60,0.05)]">
      <div className="relative aspect-[4/3]">
        <PropertyThumb propertyType={property.propertyType} className="h-full w-full" />
        <span
          className={
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold " +
            (property.status === "Available" ? "bg-white/90 text-navy" : "bg-navy/80 text-white")
          }
        >
          {property.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-navy">{property.name}</h3>
        <p className="mt-1 text-sm text-muted">
          {property.neighbourhood} · {property.propertyType} · {property.listingType === "buy" ? "For sale" : "To rent"}
        </p>
        <p className="mt-3 text-xl font-bold text-navy">{formatPrice(property)}</p>
        <p className="mt-1 text-sm text-muted">
          {property.bedrooms} bedroom{property.bedrooms === 1 ? "" : "s"} · {property.bathrooms} bathroom
          {property.bathrooms === 1 ? "" : "s"}
        </p>
        <div className="mt-5 flex flex-1 items-end gap-2.5">
          <ButtonEl variant="secondary" size="sm" className="flex-1" onClick={() => onViewDetails(property.id)}>
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
