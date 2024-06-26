import { Router } from "express";
import PacienteController from "./controllers/PacienteController";
import AtendenteController from "./controllers/AtendenteController"
import EnfermeiraController from "./controllers/EnfermeiraController"
import MedicoController from "./controllers/MedicoController"
import funcionarioController from "./controllers/funcionarioController";
import AtendimentoController from "./controllers/AtendimentoController";

const router = Router()

router.post("/paciente", PacienteController.createUser)
router.get("/pacientes", PacienteController.findAllPacientes)
router.get("/paciente/:id", PacienteController.findPacienteById)
router.get("/paciente/search/:nome", PacienteController.findPacienteByAll)
router.put("/paciente/:id", PacienteController.updatePaciente)
router.delete("/paciente/:id", PacienteController.deletePacienteById)

router.post("/atendente",AtendenteController.createAtendente)
router.get("/atendentes",AtendenteController.findAllAtendentes)
router.get("/atendente/:id",AtendenteController.findAtendenteById)
router.get("/atendente/search/:nome",AtendenteController.findAtendenteByAll)
router.put("/atendente/:id",AtendenteController.updateAtendente)
router.delete("/atendente/:id",AtendenteController.deleteAtendenteById)



router.post("/enfermeira",EnfermeiraController.createEnfermeira)
router.get("/enfermeiras",EnfermeiraController.findAllEnfermeiras)
router.get("/enfermeira/:id",EnfermeiraController.findEnfermeiraById)
router.get("/enfermeira/search/:nome",EnfermeiraController.findEnfermeiraByAll)
router.put("/enfermeira/:id",EnfermeiraController.updateEnfermeira)
router.delete("/enfermeira/:id",EnfermeiraController.deleteEnfermeiraById)

router.post("/medico", MedicoController.createMedico);
router.get("/medicos", MedicoController.findAllMedicos);
router.get("/medico/:id", MedicoController.findMedicoById);
router.get("/medico/search/:nome", MedicoController.findMedicoByAll);
router.put("/medico/:id", MedicoController.updateMedico);
router.delete("/medico/:id", MedicoController.deleteMedicoById);


router.get("/funcionarios", funcionarioController.findAllFuncionarios)

router.get("/funcionarios", funcionarioController.findAllFuncionarios)

router.post("/atendimento",AtendimentoController.createAtendimento)
router.get("/atendimentos",AtendimentoController.findAllAtendimentos)
router.get("/atendimento/:id",AtendimentoController.findAtendimentoById)
router.get("/atendimento/search/:nome",AtendimentoController.findAtendimentoByAll)
router.put("/atendimento/:id",AtendimentoController.updateAtendimento)
router.delete("/atendimento/:id",AtendimentoController.deleteAtendimentoById)


export {router}