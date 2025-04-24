import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect } from "react"

const items = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    title: "Chambre Meublée",
    description: "Bien située à Tunis",
    price: 300,
    type: "Chambre",
    place: "Tunis",
    link: "/offredetails/1",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    title: "Studio Moderne",
    description: "Proche des transports",
    price: 400,
    type: "Studio",
    place: "Ariana",
    link: "/offredetails/2",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S2",
    description: "Confortable pour une petite famille",
    price: 600,
    type: "S2",
    place: "Sfax",
    link: "/offredetails/3",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S4",
    description: "Spacieux et lumineux",
    price: 800,
    type: "S4",
    place: "Tunis",
    link: "/offredetails/4",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200",
    title: "Studio Meublé",
    description: "Idéal pour étudiants",
    price: 350,
    type: "Studio",
    place: "Tunis",
    link: "/offredetails/5",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S3",
    description: "Vue mer à Sousse",
    price: 700,
    type: "S3",
    place: "Sousse",
    link: "/offredetails/6",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300x200",
    title: "Appartement S1",
    description: "Compact et pratique",
    price: 500,
    type: "S1",
    place: "Monastir",
    link: "/offredetails/7",
  },{
    id: 6,  // New Plus Symbol Item
    isPlus: true,  // Flag to identify the Plus Symbol item
  },
]
export default function Carousel1() {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0

    const startDragging = (e: MouseEvent | TouchEvent) => {
      isDown = true
      startX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX
      scrollLeft = container.scrollLeft
    }

    const stopDragging = () => {
      isDown = false
    }

    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX
      const walk = (x - startX) * 1.5
      container.scrollLeft = scrollLeft - walk
    }

    container.addEventListener("mousedown", startDragging)
    container.addEventListener("touchstart", startDragging)
    container.addEventListener("mouseleave", stopDragging)
    container.addEventListener("mouseup", stopDragging)
    container.addEventListener("touchend", stopDragging)
    container.addEventListener("mousemove", onDrag)
    container.addEventListener("touchmove", onDrag)

    return () => {
      container.removeEventListener("mousedown", startDragging)
      container.removeEventListener("touchstart", startDragging)
      container.removeEventListener("mouseleave", stopDragging)
      container.removeEventListener("mouseup", stopDragging)
      container.removeEventListener("touchend", stopDragging)
      container.removeEventListener("mousemove", onDrag)
      container.removeEventListener("touchmove", onDrag)
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-4">
        <Button onClick={() => scroll("left")} variant="outline">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button onClick={() => scroll("right")} variant="outline">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[calc(100%/3)] flex-shrink-0 p-2 snap-start"
            >
              <div
                className={` rounded-xl border shadow-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-4 h-full ${item.isPlus ? 'flex justify-center items-center bg-gray-300' : ''}`}
              >
                {item.isPlus ? (
                  <a href="/Offers" className="text-6xl font-bold text-primary cursor-pointer">
                  +
                </a> 
                ) : (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover  cursor-pointer rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <p className="font-semibold text-primary mb-3">{item.price}</p>
                    <Button asChild className="w-full">
                      <a href={item.link}>View Details</a>
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
