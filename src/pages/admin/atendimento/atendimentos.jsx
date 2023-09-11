import Head from 'next/head';
import Content from '../../../components/content';
import Table from '../../../components/table';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import PrivateRoute from '../../../components/privateRoute';
import TableAtendimento from '../../../components/tableAtendimento';

export default function AtendimentosPage() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <PrivateRoute>
''
      <Content title="Atendimentos">
        <div className="flex row gap-3">
          <div className="relative w-full">
            <input
              className="text-base relative h-10 flex flex-1 w-full rounded-md px-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none focus:ring-1 border-gray-400 border"
              type="text"
              id="search"
              placeholder="Pesquise pelo nome"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon="search" className="text-gray-400" />
            </div>
          </div>
          <Link href="./cadastro">
            <button className="rounded bg-red-500 w-20 h-10 mt-0 text-white">
              Adicionar
            </button>
          </Link>
        </div>
        <br />
        <TableAtendimento nome={searchValue} tipo={'atendimento'}/>
      </Content>
    </PrivateRoute>
  );
}
