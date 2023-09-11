import { useState } from 'react';

const PesquisaAtendimento = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar..."
        className="w-full p-2 border rounded-lg bg-white"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="mt-2">
        {filteredData.map((item, index) => (
          <li key={index} className="p-2 border-b">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default PesquisaAtendimento;