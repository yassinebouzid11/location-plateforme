import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-16">
          Nous sommes disponibles pour des questions, des feedback ou des opportunités de collaboration. Faites-nous savoir comment nous pouvons vous aider !
          </p>

          <div>
            <h2 className="text-xl font-bold mb-4">Contact Details</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                <span className="font-semibold">Phone:</span> +216 41830813
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <span className="text-black">
                  bouzidyassine08@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="block text-sm">
                  First Name
                </label>
                <Input id="first-name" placeholder="First Name" className="w-full" />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="block text-sm">
                  Last Name
                </label>
                <Input id="last-name" placeholder="Last Name" className="w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <Input id="email" type="email" placeholder="Email" className="w-full" />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm">
                Subject
              </label>
              <Input id="subject" placeholder="Subject" className="w-full" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm">
                Message
              </label>
              <Textarea id="message" placeholder="Type your message here." className="w-full min-h-[120px]" />
            </div>

            <Button className="w-full bg-black text-white hover:bg-gray-800">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

