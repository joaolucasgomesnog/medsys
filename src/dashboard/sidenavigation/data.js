import HomeIcon from './icons/home';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';
import CreditsIcon from './icons/credits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUsers } from '@fortawesome/free-solid-svg-icons';


const data = [
  {
    title: 'Página Inicial',
    icon: <FontAwesomeIcon icon='home' />,
    link: '/',
  },
  {
    title: 'Pacientes',
    icon: <FontAwesomeIcon icon='users' />,
    link: '/admin/pacientes',
  },
  {
    title: 'Funcionários',
    icon: <FontAwesomeIcon className='h-6 w-6' icon='user-nurse'/>,
    link: '/admin/funcionarios',
  },
  {
    title: 'Procedimentos',
    icon: <FontAwesomeIcon icon='bed-pulse' />,
    link: '/admin/procedimentos',
  },
  {
    title: 'Configurações',
    icon: <SettingsIcon />,
    link: '/admin/configuracoes',
  },

];

export default data;
