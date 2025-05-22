import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"; 
import { Button } from "../ui/button";
import Modal from "react-modal"
import axios from "axios"
import { User } from "@/pages/admin/ManageUsers";



export interface otherUserType {
  _id: string
  nom: string
}

export interface Conversation {
  _id: string
  otherUser:otherUserType
}


export function SidebarConversation() {
  const { conversationId } = useParams();
  const [users, setUsers] = useState<User[]>([])
  // const [conversationUsers, setConversationUsers] = useState<conversationUsersType>()
  const [conversations,setConversations]= useState<Conversation[]>([])
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 10;

  const filteredConversations = conversations.filter((conv) =>
      conv.otherUser.nom.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      searchUser != "" && user.nom.toLowerCase().includes(searchUser.toLowerCase())
  )
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/all'); 
      setUsers(response.data);
      console.log(response.data);

    } catch (err: any) {
      console.log(err.message || 'An error occurred');
    }
  };
  

  
  const fetchConversations = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.log("User not found in localStorage");
      return;
    }

    const loggedUser = JSON.parse(storedUser); // safely parse
    try {
      const response = await axios.get(`http://localhost:5000/conversations/${loggedUser.id}`); 
      setConversations(response.data);
      console.log(response.data);
      
      } catch (err: any) {
      console.log(err.message || 'An error occurred');
      }
  };

  useEffect(() => {
    fetchConversations();
  }, []);


  const closeModal = () => {
    setIsModalOpen(false)
  }

  const addConversation = () => {
    setIsModalOpen(true)
    fetchUsers();
  }

  const createConverssation = async (id: string)=>{
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.log("User not found in localStorage");
      return;
    }

    const loggedUser = JSON.parse(storedUser);
    const newConversation= {user1:loggedUser.id, user2:id}
    console.log(newConversation)

    try{
    const response = await axios.post("http://localhost:5000/conversations",newConversation)
    console.log(response.data)
    fetchConversations();
    setIsModalOpen(false)
    } catch (error: any) {
        alert("Erreur : " + (error.response?.data?.message || "Une erreur est survenue."))
    }
  };

  return (
    <div className="w-72 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="text-lg font-bold mb-2">Conversations</div>
        <Input
          placeholder="Search by nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <Link
              to={`/messages/conversation/${c._id}`}
              key={c._id}
              className={`block px-4 py-3 hover:bg-gray-100 ${
                c._id === conversationId ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <div>{c.otherUser.nom}</div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-sm">No results found.</div>
        )}
      </div>
      <div  className="self-end m-2">
        <Button className="" onClick={addConversation}>Nouveau</Button>
      </div>
      <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Modifier l'utilisateur"
              className="max-w-sm w-full mx-auto mt-40 bg-white rounded-md shadow-lg p-6 flex flex-col focus:outline-none"
            >
              <h2 className="text-lg font-semibold mb-2">Rechercher un utilisateur</h2>
              <Input
                placeholder="Tapez un nom..."
                value={searchUser}
                className="mb-2"
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <div>

                {currentUsers.map((user)=>
                <div className="py-2 hover:bg-muted cursor-pointer" onClick={()=>createConverssation(user._id)}>
                  {user.nom}
                </div>)}
                {currentUsers.length==0 && searchUser != "" && <div>Aucun utilisateur trouvé avec le nom "{searchUser}"</div>}

                {currentUsers.length>0 && 
                <div className="flex justify-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <span className="mx-2">
                    Page {currentPage} sur {Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * ITEMS_PER_PAGE >= filteredUsers.length}
                  >
                    Suivant
                  </Button>  
                </div>}

              </div>
              <Button variant="default" onClick={closeModal} className="mt-2 self-end">
                Annuler
              </Button>
            </Modal>
    </div>
  );
}