// src/pages/admin/ManageUsers.tsx
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2} from "lucide-react"
import Modal from "react-modal"
import axios from "axios"

interface User {
  _id: string
  nom: string
  email: string
  cin: number
}

// const Users: User[] = [
//   { id: 1, name: "Yasmine B.", email: "yasmine@example.com", cin: "12345678" },
//   { id: 2, name: "Ali K.", email: "ali@example.com", cin: "87654321" },
//   { id: 3, name: "Sara M.", email: "sara@example.com", cin: "11223344" },
//   { id: 4, name: "Nadia L.", email: "nadia@example.com", cin: "22334455" },
//   { id: 5, name: "Ahmed T.", email: "ahmed@example.com", cin: "33445566" },
//   { id: 6, name: "Mona P.", email: "mona@example.com", cin: "44556677" },
// ]


export default function ManageUsers() {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"delete" | "edit" | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

const ITEMS_PER_PAGE = 10

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/users/all'); // Adjust base URL if needed
    setUsers(response.data);
  console.log(response.data);
    
  } catch (err: any) {
    console.log(err.message || 'An error occurred');
  }
};

useEffect(() => {
  fetchUsers();
}, []);

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.cin.toString().includes(search)
  )

  const indexOfLastUser = currentPage * ITEMS_PER_PAGE
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const deleteUser = async (id: string) => {
    // setUsers(users.filter((user) => user._id !== id))
    try {
      await axios.delete(`http://localhost:5000/users/delete/${id}`);
      fetchUsers();
  } catch (err: any) {
    console.log(err.message || 'An error occurred');
  }
    closeModal()
  }

  const editUser = (user: User) => {
    setSelectedUser(user)
    setModalType("edit")
    setIsModalOpen(true)
  }

  const confirmDelete = (user: User) => {
    setSelectedUser(user)
    setModalType("delete")
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
    setModalType(null)
  }

  const handleSaveEdit = async (id: string) => {
    if(selectedUser){
      const updatedData = {
        nom:selectedUser.nom,
        email:selectedUser.email,
        cin: selectedUser.cin,
      }

      try {
        const response=await axios.put(`http://localhost:5000/users/${id}`,updatedData);
        console.log(response)
        fetchUsers();
      } catch (err: any) {
        console.log(err.message || 'An error occurred');
      }
    }
    closeModal()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>

      <div className="mb-4 flex justify-end">
        <Input
          type="text"
          placeholder="Rechercher par nom, email ou CIN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-muted text-left">

              <th className="p-3">Nom</th>
              <th className="p-3">Email</th>
              <th className="p-3">CIN</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-t">

                <td className="p-3 font-medium">{user.nom}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.cin}</td>
                <td className="p-3 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => editUser(user)}>
                    <Pencil className="w-4 h-4 mr-1" /> Modifier
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => confirmDelete(user)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                  </Button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-muted-foreground">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
      </div>

      <Modal
        isOpen={isModalOpen && modalType === "delete"}
        onRequestClose={closeModal}
        contentLabel="Confirmer la suppression"
        className="max-w-sm w-full mx-auto mt-40 bg-white rounded-md shadow-lg p-6 focus:outline-none"
      >
        <h2 className="text-lg font-semibold">Confirmer la suppression</h2>
        <p className="text-sm text-muted-foreground mb-4">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
        <div className="flex gap-2 justify-end">
          <Button variant="destructive" onClick={() => deleteUser(selectedUser!._id)}>
            Supprimer
          </Button>
          <Button variant="outline" onClick={closeModal}>
            Annuler
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen && modalType === "edit"}
        onRequestClose={closeModal}
        contentLabel="Modifier l'utilisateur"
        className="max-w-sm w-full mx-auto mt-40 bg-white rounded-md shadow-lg p-6 focus:outline-none"
      >
        <h2 className="text-lg font-semibold mb-2">Modifier l'utilisateur</h2>
        {selectedUser && (
          <div className="space-y-2">
            <label htmlFor="Nom">Nom</label>
            <Input
              placeholder="Nom"
              value={selectedUser.nom}
              onChange={(e) => setSelectedUser({ ...selectedUser, nom: e.target.value })}
            />
            <label htmlFor="Email">Email</label>
            <Input
              placeholder="Email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            />
            <label htmlFor="CIN">CIN</label>
            <Input
              placeholder="CIN"
              value={selectedUser.cin}
              onChange={(e) => setSelectedUser({ ...selectedUser, cin: +e.target.value })}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button variant="default" onClick={()=>handleSaveEdit(selectedUser._id)}>
                Enregistrer
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
