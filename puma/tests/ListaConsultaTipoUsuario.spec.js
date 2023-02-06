import ListaConsultaTipoUsuario from '../src/components/tipoUsuario/consulta-tipoUsuario/ListaConsultaTipoUsuario/ListaConsultaTipoUsuario.js'
import UserService from '../src/services/UserService.js';

describe('Get Lista Consulta Tipo Usuario Data', () => {
    it('Should get Lista Consulta Tipo Usuario data', () => {
        let response = {
            listUserTypes: [],
            userService: new UserService(),
          };
        expect(ListaConsultaTipoUsuario.data()).toStrictEqual(response);
    })
  })
  