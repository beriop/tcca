import agendamentosController from './controller/agendamentosController.js'
import usuarioController from './controller/usuarioController.js'

export default function adicionarRotas(servidor) {
    servidor.use(agendamentosController);
    servidor.use(usuarioController);
}
