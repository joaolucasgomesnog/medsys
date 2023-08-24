import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { forwardRef, useState , useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Router, { useRouter } from 'next/router';
import Loading from './loading';
import toggleLoading from './toggleLoading'

export default function Table({nome}) {
    const router = useRouter()
    const [pacientes, setPacientes] = useState([])
    const getPacientes = () => {
        fetch("http://localhost:3030/pacientes")
        .then(res => res.json())
        .then(dados => {
            console.log(dados)
            setPacientes(dados)
            
        })
    }
    const getPacientesbyAll = (nome) => {
        fetch(`http://localhost:3030/paciente/search/${nome}`)
        .then(res => res.json())
        .then(dados => {
            console.log(dados)
            setPacientes(dados)
            
        })
    }

    useEffect(() => {
        toggleLoading()
        if (nome == "") {
            getPacientes()
        }else{
            getPacientesbyAll(nome)
        }
        toggleLoading()
    },[nome])

    const itemsPerPage = 10; // Quantidade de itens por página
    const [currentPage, setCurrentPage] = useState(0);
  
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
  
    const offset = currentPage * itemsPerPage;
    const paginatedData = pacientes.slice(offset, offset + itemsPerPage);





    return (
        <div>
            <Loading/>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                CPF

                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-3">
                                RG
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SUS
                            </th>
                            <th scope="col" className="pl-15 py-3 text-left">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            pacientes.map((paciente) =>
                                <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                    <td className="px-6 py-4">{`${paciente.cpf.slice(0,3)}.${paciente.cpf.slice(3,6)}.${paciente.cpf.slice(6,9)}-${paciente.cpf.slice(9,11)}`}</td>
                                    <td className="px-6 py-4">{paciente.nome}</td>
                                    <td className="px-6 py-4">{paciente.rg}</td>
                                    <td className="px-6 py-4">{paciente.num_sus}</td>
                                    <td className="pl-15 py-4 justify-center">
                                        <span className='flex flex-row space-x-2'>
                                            <button className='rounded-md h-6 w-6  bg-transparent text-white placeholder-gray-400  focus:outline-none focus:ring-1 border-gray-400 border'>
                                                <FontAwesomeIcon icon="pencil" className="text-gray-400" onClick={() => {router.push(`/admin/paciente/editar/${paciente.id}`)}}/>
                                            </button>
                                            <button className='rounded-md h-6 w-6  bg-transparent text-white placeholder-gray-400  focus:outline-none focus:ring-1 border-gray-400 border'>
                                                <FontAwesomeIcon icon="trash" className="text-gray-400" />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <ReactPaginate className='flex flex-row justify-end gap-3 bg-gray-700 text-gray-400 pr-5'
                    previousLabel={<FontAwesomeIcon icon="arrow-left" className="text-gray-400" />} 
                    nextLabel={<FontAwesomeIcon icon="arrow-right" className="text-gray-400" />}
                    pageCount={Math.ceil(pacientes.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />

            </div>
    </div>
);}