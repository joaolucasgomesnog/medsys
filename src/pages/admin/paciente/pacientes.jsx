import Head from 'next/head';
import Content from '../../../components/content';
import Table from '../../../components/table';
import Link from 'next/link';

export default function PacientesPage() {
  return <Content title="Pacientes">
    <div className="flex justify-end">
      <Link href="./cadastro">
        <button className="rounded bg-red-500 w-20 h-10 mt-0 text-white">Adicionar</button>
      </Link>
    </div>
    <br />
    <Table/>
  </Content>;

}
