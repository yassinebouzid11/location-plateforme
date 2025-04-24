import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface MenuItem {
  title: string;
  url: string;
}

const Navbar = () => {

    const {logo, menu}={
        logo : {
            url: "/",
            src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
            alt: "logo",
            title: "LocationExpress",
            },
        menu :[
            { title: "Home", url: "/" },
            { title: "Offers",url: "/Offers",},
            { title: "Contacts",url: "/Contacts",},
            { title: "Créer une offer",url: "/CreateOffer",},
            ],
    }
  return (
    <section className="py-4 px-4">
      <div className="">
        {/* Desktop Menu */}
        <nav className=" justify-between flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={"/login"}>Connexion</a>
            </Button>
            <Button asChild size="sm">
              <a href={"/signup"}>Register</a>
            </Button>
          </div>
        </nav>

      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};


export { Navbar };