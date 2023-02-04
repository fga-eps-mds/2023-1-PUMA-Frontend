import ConsultaProjetos from '../src/components/projeto/consulta-projeto/consulta-projeto'
import CadastroProjeto from '../src/components/projeto/cadastro-projeto/cadastro-projeto'

import ProjectService from '../src/services/ProjectService';

describe('Get ConsultaProjetos data', () => {
    it('Should get ConsultaProjetos data', () => {
        let response = {
            projectSearch: null,

            operacao: null,
      
            isLoading: false,
      
            wasLoaded: false,
      
            projects: [],
      
            projectService: new ProjectService(),
          };
        expect(ConsultaProjetos.data()).toEqual(response);
    })
})

describe('Get CadastroProjeto data', () => {
    it('Should get CadastroProjeto data', () => {
        let response = {
            titulo: '',

            descricao: '',
      
            resultadoEsperado: '',
      
            formIsValid: '',
      
            keywords: [],
      
            mainKeyword: null,
      
            selectedKeywords: [],
      
            projectService: new ProjectService(),
      
            multiSelectPlaceholder: 'Carregando opções...',
          };
        expect(CadastroProjeto.data()).toEqual(response);
    })
})