import Head from 'next/head';
import Content from '../../../components/content';
import FormularioPaciente from '../../../components/formularioPaciente'

export default function PacientesPage() {
  return <Content title="Cadastro de paciente">
    <FormularioPaciente/>
  </Content>;

}