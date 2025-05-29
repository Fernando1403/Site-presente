import { useState } from "react";

function AddGift({ onSubmit }) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name,
      size,
      description,
      price,
    });

    // Limpar os campos após enviar
    setName("");
    setSize("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Adicionar Presente</h2>

        <label className="block mb-2 font-medium">Nome do Presente</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Tamanho</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <label className="block mb-2 font-medium">Descrição</label>
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block mb-2 font-medium">Preço (opcional)</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
        >
          Salvar Presente
        </button>
      </form>
    </div>
  );
}

export default AddGift;
