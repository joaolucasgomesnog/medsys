import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const data = [
  {
    title: 'Página Inicial',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="home" />,
    link: '/',
  },
  {
    title: 'Pacientes',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="users" />,
    link: '/admin/paciente/pacientes',
  },
  {
    title: 'Enfermeiras',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="user-nurse" />,
    link: '/admin/enfermeira/enfermeiras',
  },
  {
    title: 'Médicos',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="user-nurse" />,
    link: '/admin/medico/medicos',
  },
  {
    title: 'Atendentes',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="user-nurse" />,
    link: '/admin/atendente/atendentes',
  },
  {
    title: 'Atendimentos',
    icon: <FontAwesomeIcon icon="bed-pulse" />,
    link: '/admin/atendimento/atendimentos',
  },
  {
    title: 'Planos de Saúde',
    icon: <FontAwesomeIcon className="h-6 w-6" icon="gear" />,
    link: '/admin/plano/planos',
  },
  {
    title: 'Sair',
    icon: <FontAwesomeIcon className='h-6 w-6' icon='sign-out' color='#ee6b6e' />,
    link: '/login',
  },
];

export default data;
