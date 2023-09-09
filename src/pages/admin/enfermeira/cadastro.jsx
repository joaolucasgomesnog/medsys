import Head from 'next/head';
import Content from '../../../components/content';
import FormularioEnfermeira from '../../../components/formularioEnfermeira';
import PrivateRoute from '../../../components/privateRoute';

export default function PacientesPage() {

  return (
    <PrivateRoute>
      <Content title="Cadastro de enfermeira">
        <FormularioEnfermeira tipo={'Cadastrar'}/>
      </Content>
    </PrivateRoute>
  );
}

