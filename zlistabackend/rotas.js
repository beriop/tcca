import listaNegraController from './controller/listaNegraController.js'
import usuarioController from './controller/usuarioController.js'

export default function adicionarRotas(servidor) {
    servidor.use(listaNegraController);
    servidor.use(usuarioController);
}
