import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import {  SidebarHeader } from "./ui/sidebar";
import { NavUser } from "./NavUser";

interface MenuItem {
  title: string;
  url: string;
}

const Navbar = () => {
    const [isLogged,setIsLogged]=useState(true)

    const {logo, menu, user}={
        user: {
          name: "Yassine bouzid",
          email: "bouzidyassine08@gmail.com",
          avatar: "avatars.jpg",
        },
        logo : {
            url: "/",
            src: "../../public/icon2.png",
            alt: "logo",
            title: "LocationExpress",
          },
          menu :[
            { title: "Accueil", url: "/" },
            { title: "Offres",url: "/Offres",},
            { title: "Contacts",url: "/Contacts",},
            { title: "Créer une offer",url: "/CreateOffer",},
          ],
        }
        return ( 
    <section className="py-1 px-4 sticky top-0 z-1 bg-white/30 backdrop-blur-sm shadow-md">
      <div className="">
        <nav className="justify-between flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8 max-w-14" alt={logo.alt} />
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
            {!isLogged ?
            <>
              <Button variant="outline" size="sm">
                <a href={"/login"}>Connexion</a>
              </Button>
              <Button  size="sm">
                <a href={"/signup"}>Register</a> 
              </Button>
            </> 
            :<>
              <SidebarHeader className="h-16  border-sidebar-border">
                <NavUser user={user} />
              </SidebarHeader>
              
            </>
              }
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