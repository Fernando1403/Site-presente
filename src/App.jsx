import { useEffect, useState } from "react";
import AddGift from "./AddGit";

const initialData = {
  giftsFernando: [
    {
      id: 1,
      name: "Tênis Nike",
      size: "42",
      description: "Tênis preto confortável para caminhada",
      price: "299,90",
    },
  ],
  giftsGiovanna: [],
};

function App() {
  const [giftsFernando, setGiftsFernando] = useState(() => {
    const stored = localStorage.getItem("giftsFernando");
    return stored ? JSON.parse(stored) : initialData.giftsFernando;
  });

  const [giftsGiovanna, setGiftsGiovanna] = useState(() => {
    const stored = localStorage.getItem("giftsGiovanna");
    return stored ? JSON.parse(stored) : initialData.giftsGiovanna;
  });

  const [adding, setAdding] = useState(false);
  const [activePerson, setActivePerson] = useState(null);
  const [editingGift, setEditingGift] = useState(null); // novo estado

  useEffect(() => {
    localStorage.setItem("giftsFernando", JSON.stringify(giftsFernando));
    localStorage.setItem("giftsGiovanna", JSON.stringify(giftsGiovanna));
  }, [giftsFernando, giftsGiovanna]);

  const handleAddGift = (gift) => {
    if (editingGift) {
      // Edição
      const updateList = (list, setList) => {
        const updated = list.map((item) =>
          item.id === editingGift.id ? { ...item, ...gift, id: editingGift.id } : item
        );
        setList(updated);
      };

      if (activePerson === "Fernando") {
        updateList(giftsFernando, setGiftsFernando);
      } else {
        updateList(giftsGiovanna, setGiftsGiovanna);
      }

      setEditingGift(null);
    } else {
      // Novo presente
      const newGift = { ...gift, id: Date.now() };
      if (activePerson === "Fernando") {
        setGiftsFernando([...giftsFernando, newGift]);
      } else {
        setGiftsGiovanna([...giftsGiovanna, newGift]);
      }
    }

    setAdding(false);
  };

  const handleDelete = (id, person) => {
    if (person === "Fernando") {
      setGiftsFernando(giftsFernando.filter((gift) => gift.id !== id));
    } else {
      setGiftsGiovanna(giftsGiovanna.filter((gift) => gift.id !== id));
    }
  };

  const handleEdit = (gift, person) => {
    setActivePerson(person);
    setEditingGift(gift);
    setAdding(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {adding ? (
        <AddGift onSubmit={handleAddGift} initialGift={editingGift} />
      ) : (
        <div className="flex flex-col items-center w-full max-w-5xl">
          <h1 className="text-3xl font-bold mb-6">Lista de Presentes</h1>
          <div className="flex w-full gap-4 flex-col md:flex-row justify-center">
            {/* Lista Fernando */}
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Fernando</h2>
                <button
                  onClick={() => {
                    setActivePerson("Fernando");
                    setEditingGift(null);
                    setAdding(true);
                  }}
                  className="text-green-600 text-2xl"
                  title="Adicionar presente"
                >
                  +
                </button>
              </div>
              <ul>
                {giftsFernando.map((gift) => (
                  <li
                    key={gift.id}
                    className="border-b py-2 flex justify-between items-center"
                  >
                    <div>
                      <strong>{gift.name}</strong> – R$ {gift.price}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(gift, "Fernando")} title="Editar">🖉</button>
                      <button onClick={() => handleDelete(gift.id, "Fernando")} title="Excluir">❌</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lista Giovanna */}
            <div className="bg-white p-4 rounded shadow w-full md:w-1/2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Giovanna</h2>
                <button
                  onClick={() => {
                    setActivePerson("Giovanna");
                    setEditingGift(null);
                    setAdding(true);
                  }}
                  className="text-green-600 text-2xl"
                  title="Adicionar presente"
                >
                  +
                </button>
              </div>
              <ul>
                {giftsGiovanna.map((gift) => (
                  <li
                    key={gift.id}
                    className="border-b py-2 flex justify-between items-center"
                  >
                    <div>
                      <strong>{gift.name}</strong> – R$ {gift.price}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(gift, "Giovanna")} title="Editar">🖉</button>
                      <button onClick={() => handleDelete(gift.id, "Giovanna")} title="Excluir">❌</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
