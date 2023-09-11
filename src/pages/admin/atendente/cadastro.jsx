import Head from 'next/head';
import Content from '../../../components/content';
import FormularioAtendente from '../../../components/formularioAtendente';
import PrivateRoute from '../../../components/privateRoute';

export default function cadastroAtendente() {

  return (
    <PrivateRoute>
      <Content title="Cadastro de atendente">
        <FormularioAtendente tipo={'Cadastrar'}/>
      </Content>
    </PrivateRoute>
  );
}

