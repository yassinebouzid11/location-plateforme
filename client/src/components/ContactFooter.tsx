import { Mail, MapPin, Phone } from "lucide-react";

const ContactFooter = () => {
  return (
    <section className="pt-36 ">
      <div className="container">
        <div className="mb-14">
          <h1 className="mt-6 ml-3 text-4xl font-bold text-pretty lg:text-3xl">
          Parlez à notre équipe
          </h1>
          <p className="text-lg ml-3 text-pretty text-muted-foreground">
          Nous serions ravis de vous aider.Remplissez le formulaire ou envoyez-nous un e-mail.
          </p>
        </div>
        <div className="mx-3 grid gap-10 md:grid-cols-3">
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">Envoyez-nous un courriel</p>
            <p className="mb-3 text-muted-foreground">
            Notre équipe est prête à vous aider.
            </p>
            <span className="font-semibold ">
              bouzidyassine08@gmail.com
            </span>
          </div>
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">Visitez-nous</p>
            <p className="mb-3 text-muted-foreground">
            Passez à notre bureau pour discuter.
            </p>
            <span className="font-semibold ">
              5090 Bekalta, Monastir
            </span>
          </div>
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">Appelez-nous</p>
            <p className="mb-3 text-muted-foreground">
            Nous sommes disponibles du lundi au vendredi, de 9h à 17h.
            </p>
            <span className="font-semibold ">
              +216 41830813
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContactFooter };
