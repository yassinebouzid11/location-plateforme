
import { Button } from "@/components/ui/button";
import { ContactFooter } from "./ContactFooter";
import Carousel1 from "./MainFirstCarousel";
import Carousel2 from "./MainSecondCarousel";



export  default function Main(){
const {heading, description, buttons, image}={
  heading : "LocationExpress pour faciliter votre recherche de logement",
  description : "Trouvez rapidement tous types de locations et de colocations sur notre plateforme. Cliquez ici pour les découvrir.",
  buttons : {
    primary: {
      text: "découvrez nos locations",
      url: "https://www.shadcnblocks.com",
    },
    
  },
  image : {
    src: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
}
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left px-3 -mt-6">
            
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-4xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-90 w-full rounded-md object-cover px-3"
          />
        </div>
        <h2 className="mt-6 ml-3 text-4xl font-bold text-pretty lg:text-3xl">Offres des logements</h2>
        <Carousel1 />
        <h2 className="mt-6 ml-3 text-4xl font-bold text-pretty lg:text-3xl">Offres des colocations</h2>
        <Carousel2 />
        <ContactFooter />
      </div>
    </section>
  );
};


