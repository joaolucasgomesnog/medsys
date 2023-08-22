import Content from '../../components/content';
import PrivateRoute from '../../components/privateRoute';

export default function Configuracoes() {
  return (
    <PrivateRoute>
      <Content title="Configuracoes"></Content>
    </PrivateRoute>
  );
}
