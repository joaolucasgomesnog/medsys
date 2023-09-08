import { Router } from "express";
import PacienteController from "./controllers/PacienteController";
import funcionarioController from "./controllers/funcionarioController";
const router = Router()

router.post("/paciente", PacienteController.createUser)
router.get("/pacientes", PacienteController.findAllPacientes)
router.get("/paciente/:id", PacienteController.findPacienteById)
router.get("/paciente/search/:nome", PacienteController.findPacienteByAll)
router.put("/paciente/:id", PacienteController.updatePaciente)
router.delete("/paciente/:id", PacienteController.deletePacienteById)


router.get("/funcionarios", funcionarioController.findAllFuncionarios)

export {router}