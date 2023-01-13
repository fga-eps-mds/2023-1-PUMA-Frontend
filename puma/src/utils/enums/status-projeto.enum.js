/* eslint-disable*/
const StatusProjetoEnum = Object.freeze({
  PROPOSTA_SUBMETIDA: { codigo: 'SB', descricao: 'Proposta Submetida' },
  PROPOSTA_EM_ANALISE: { codigo: 'AN', descricao: 'Proposta em Análise' },
  PROPOSTA_REALOCADA: { codigo: 'RL', descricao: 'Proposta Realocada' },
  PROPOSTA_AGUARDANDO: { codigo: 'AL', descricao: 'Proposta Aguardando Alocação' },
  PROPOSTA_ACEITA: { codigo: 'AC', descricao: 'Proposta Aceita' },
  PROPOSTA_RECUSADA: { codigo: 'RC', descricao: 'Proposta Recusada' },
  PROJETO_EM_INICIACAO: { codigo: 'IC', descricao: 'Proposta em Iniciação' },
  PROJETO_EM_EXECUCAO: { codigo: 'EX', descricao: 'Projeto em Execução' },
  PROJETO_ENCERRADO: { codigo: 'EC', descricao: 'Projeto Encerrado' },
});

export default {
  methods: {
    getDescricao(codigo) {
      let descricao = null;
      Object.keys(StatusProjetoEnum).forEach((enumName) => {
        if (StatusProjetoEnum[enumName].codigo === codigo) { descricao = StatusProjetoEnum[enumName].descricao; }
      });
      
      return descricao;
    },
    formattedDate: function(timestamp) {
      if(!timestamp) {
        return '-'
      }
      let d = new Date(timestamp)
      let dia = ("00" + d.getDate()).slice(-2)
      let mes = ("00" + d.getMonth()).slice(-2)
      let ano = d.getFullYear()

      return `${dia}/${mes}/${ano}`
    },
  }
}
