import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { forwardRef, useState , useEffect} from 'react';


export default function Table() {
    const [pacientes, setPacientes] = useState([])
    const getPacientes = () => {
        fetch("http://localhost:3030/pacientes")
        .then(res => res.json())
        .then(dados => {
            console.log(dados)
            setPacientes(dados)
            
        })
    }

    useEffect(() => {
        getPacientes()   
    },[])

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <th scope="col" className="px-6 py-3">
                                Ação
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pacientes.map((paciente) =>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">{paciente.cpf}</td>
                                    <td className="px-6 py-4">{paciente.nome}</td>
                                    <td className="px-6 py-4">{paciente.rg}</td>
                                    <td className="px-6 py-4">{paciente.num_sus}</td>
                                    <td className="px-6 py-4"><Link href="/">Editar</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
    </div>
);}