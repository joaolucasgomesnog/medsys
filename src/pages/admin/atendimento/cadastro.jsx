import Head from 'next/head';
import Content from '../../../components/content';
import PrivateRoute from '../../../components/privateRoute';
import FormularioAtendimento from '../../../components/formularioAtendimento';
export default function PacientesPage() {

  return (
    <PrivateRoute>
      <Content title="Lançamento de atendimentos">
        <FormularioAtendimento tipo={'Cadastrar'}/>
      </Content>
    </PrivateRoute>
  );
}

