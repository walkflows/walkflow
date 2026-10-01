import { customProjectCard, sessionServices } from "@/content/consulting-services";
import { ServiceCard } from "./ServiceCard";

export function ServiceExplorer({
  onViewDetails,
  onArrangeSession,
  onDiscussProject,
}: {
  onViewDetails: (id: string) => void;
  onArrangeSession: (id: string) => void;
  onDiscussProject: () => void;
}) {
  return (
    <div>
      <p className="text-sm text-white/50">{sessionServices.length} sample sessions · QUES Consulting (reference business — fictional demo records)</p>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sessionServices.map((service) => (
          <ServiceCard key={service.id} service={service} isCustomProject={false} onViewDetails={onViewDetails} onArrange={onArrangeSession} />
        ))}
        <ServiceCard service={customProjectCard} isCustomProject onViewDetails={() => {}} onArrange={onDiscussProject} />
      </ul>
    </div>
  );
}
