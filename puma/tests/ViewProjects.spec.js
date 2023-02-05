import ViewMyProject from '../src/components/projeto/ViewMyProject/ViewMyProject.js'
import ViewProject from '../src/components/projeto/ViewProject/ViewProject'


describe('Get ViewMyProject  data', () => {
    it('Should get lista disciplina data', () => {
        let response = {
            disabled: true,

            editable: false,
      
            initialForm: {
      
              projectid: null,
      
              name: '',
      
              createdat: '',
      
              problem: '',
      
              expectedresult: '',
      
              status: '',
      
              statusdesc: '',
      
              feedback: '',
      
              mainKeyword: null,
      
              selectedKeywords: [],
      
              subject: {
      
                subjectid: null,
      
                name: '',
      
              },
      
              user: {
      
                userid: null,
      
                fullname: '',
      
                email: '',
      
                phonenumber: '',
      
              },
      
              semester: {
      
                semesterid: null,
      
                year: '',
      
                semester: '',
      
              },
      
            },
      
            form: {},
      
            keywords: [],
          };
        expect(ViewMyProject.data()).toEqual(response);
    })
})

describe('Get ViewProject  data', () => {
    it('Should get ViewProject   data', () => {
        let response = {
            editable: false,

            disabled: true,
      
            currentUserAdmin: false,
      
            initialForm: {
      
              projectid: null,
      
              name: '',
      
              createdat: '',
      
              problem: '',
      
              expectedresult: '',
      
              status: '',
      
              statusdesc: '',
      
              feedback: '',
      
              mainKeyword: null,
      
              selectedKeywords: [],
      
              subject: {
      
                subjectid: null,
      
                name: '',
      
              },
      
              user: {
      
                userid: null,
      
                fullname: '',
      
                email: '',
      
                phonenumber: '',
      
              },
      
              semester: {
      
                semesterid: null,
      
                year: '',
      
                semester: '',
      
              },
      
              selectedSubject: null,
      
              selectedEvaluation: null,
      
            },
      
            form: {},
      
            evaluations: [
      
              { value: 0, text: 'Aceitar proposta' },
      
              { value: 1, text: 'Rejeitar proposta' },
      
              { value: 2, text: 'Encaminhar proposta para outra disciplina' },
      
              { value: 3, text: 'Eu não sei para qual disciplina encaminhar' },
      
            ],
      
            keywords: [],
      
            subjects: [],
          };
        expect(ViewProject.data()).toEqual(response);
    })
})