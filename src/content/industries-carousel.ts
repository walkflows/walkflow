export type CarouselSlide = {
  id: string;
  /** Displayed on the card, bottom-left, over the gradient. */
  label: string;
  src: string;
};

/**
 * One list to edit when adding, removing or replacing an industry photo.
 * Source images live in "Hero slider images/" at the project root (the
 * originals, kept for reference); each was resized/compressed into
 * public/industries/ for the actual site (see
 * review-screenshots-fonts/resize-industry-images.ps1 if more are added
 * later — same script, same target size/quality).
 */
export const industriesCarousel: CarouselSlide[] = [
  { id: "real-estate", label: "Real Estate", src: "/industries/real-estate.jpg" },
  { id: "home-services", label: "Home Services - HVAC & Plumbing", src: "/industries/home-services-hvac-plumbing.jpg" },
  { id: "clinics", label: "Clinics", src: "/industries/clinics.jpg" },
  { id: "consulting", label: "Consulting Firms", src: "/industries/consulting-firms.jpg" },
  { id: "fitness", label: "Fitness & Wellness", src: "/industries/fitness-wellness.jpg" },
  { id: "cleaning", label: "Cleaning Services", src: "/industries/cleaning-services.jpg" },
  { id: "restaurants", label: "Restaurants & Cafés", src: "/industries/restaurants-cafes.jpg" },
  { id: "ecommerce", label: "E-commerce & Retail", src: "/industries/e-commerce-retail.jpg" },
  { id: "education", label: "Education & Coaching", src: "/industries/education-coaching.jpg" },
  { id: "beauty", label: "Beauty Salons & Spas", src: "/industries/beauty-salons-spas.jpg" },
];
