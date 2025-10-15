import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect } from "react"
import { OfferT } from "./Main"


export default function Carousel2({offers}:{offers : OfferT[]}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOffers = offers.filter((offer) => {
    return (
      offer.type == "Chambre"
    )
  })

  const displayedOffers = filteredOffers.slice(0, 6) // Show only the first 6 offers

  const finalOffers = [...displayedOffers, { isPlus: true, _id: "plus" }] // Add the plus button


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

    container.scrollLeft = 0;

  let isDown = false
  let startX = 0
  let scrollLeft = 0

  const startDragging = (e: MouseEvent | TouchEvent) => {
    e.preventDefault(); // prevent default selection
    isDown = true;
    startX = 'touches' in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
    scrollLeft = container.scrollLeft;
    
  };


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
}, [offers])

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
        className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar user-select-none cursor-grab active:cursor-grabbing"
      >

        {finalOffers.map((offer) => (
          <div
            key={offer._id}
            className="w-[calc(100%/3)] flex-shrink-0 p-2 snap-start user-select-none"
          >
            <div
              className={` rounded-xl border shadow-2xl hover:shadow-xl user-select-none hover:scale-[1.02] transition-all duration-300 p-4 h-full ${offer.isPlus ? 'flex justify-center items-center bg-gray-300' : ''}`}
            >
              {"isPlus" in offer ? (
                <a href="/Offers" className="text-6xl font-bold text-primary cursor-pointer">
                +
              </a> 
              ) : (
                <>
                  <img
                    src={`http://localhost:5000/offer/image/${offer._id}/0`}
                    alt={offer.titre}
                    className="w-full h-40 object-cover  cursor-pointer rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-bold">{offer.titre}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {offer.description}
                  </p>
                  <p className="font-semibold text-primary mb-3">{offer.prix}</p>
                  <Button asChild className="w-full">
                    <a href={offer.link}>View Details</a>
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
