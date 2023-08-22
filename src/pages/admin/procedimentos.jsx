import Content from '../../components/content';
import PrivateRoute from '../../components/privateRoute';

export default function Procedimentos() {
  return (
    <PrivateRoute>
      <Content title="Procedimentos"></Content>
    </PrivateRoute>
  );
}
