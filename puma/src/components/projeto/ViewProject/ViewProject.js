/* eslint-disable */
import ProjectService from '../../../services/ProjectService';
import SubjectService from '../../../services/SubjectService';
import statusProjetoEnum from '../../../utils/enums/status-projeto.enum';
import ReturnButton from '../../shared/ReturnButton/ReturnButton.vue';

export default {
    name: 'ViewProject',
    props: {},
    mixins: [statusProjetoEnum],
    components: {
        ReturnButton,
      },
    data() {
        return {
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
                { value: 3, text: 'Eu não sei para qual disciplina encaminhar' }
            ],
            keywords: [],
            subjects: [],
        };
    },
    async created() {
        this.form = JSON.parse(JSON.stringify(this.initialForm));
        await this.handleLoadData();
        this.editable = ['SB', 'RL', 'AL'].includes(this.form.status);
    },
    methods: {
        toggleEnableForm: function () {
            this.disabled = !this.disabled;
        },
        isChecked: function (keyword) {
            return this.form.selectedKeywords.find((k) => k.value === keyword.value);
        },
        hasFeedback: function () {
            return ['RL', 'AL', 'AC', 'RC', 'IC', 'EX', 'EC'].includes(this.form.status);
        },
        makeToast: function (title, message, variant) {
            this.$bvToast.toast(message, { title: title, variant: variant, solid: true, autoHideDelay: 4000 });
        },
        handleChangeEvaluation: function () {
            const AC_FEEDBACK = 'A proposta de projeto foi aceita e em breve poderá ser alocada a um semestre.';
            if (this.form.selectedEvaluation?.value === 0) {
                this.form.feedback = AC_FEEDBACK;
            } else {
                this.form.feedback = '';
            }
        },
        handleLoadData: async function () {
            try {
                const projectId = this.$route.params.id;
                const projectService = new ProjectService();
                const subjectService = new SubjectService();
                this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });

                const project = (await projectService.getProject(projectId)).data;
                const allSubjects = (await subjectService.getSubjects()).data;

                const { Keywords, User, Subject, Semester, ...rest } = project;
                const mainKeyword = Keywords.filter((k) => k.main)[0];
                const createdat = (new Date(project.createdat)).toLocaleString();
                const formData = {
                    ...rest,
                    createdat,
                    feedback: project.feedback || '',
                    statusdesc: this.getDescricao(project.status),
                    user: User,
                    subject: Subject,
                    semester: Semester,
                    mainKeyword: mainKeyword && { value: mainKeyword.keywordid, text: mainKeyword.keyword },
                    selectedKeywords: Keywords.map((k) => ({ value: k.keywordid, text: k.keyword }))
                        .sort((a, b) => a.text.localeCompare(b.text)),
                    selectedSubject: null,
                    selectedEvaluation: null,
                };

                this.subjects = allSubjects.map((s) => ({ value: s.subjectid, text: s.name })).sort((a, b) => a.text.localeCompare(b.text));
                this.initialForm = JSON.parse(JSON.stringify(formData));
                this.form = JSON.parse(JSON.stringify(formData));

                this.$store.commit('CLOSE_LOADING_MODAL');
            } catch (error) {
                this.$store.commit('CLOSE_LOADING_MODAL');
                this.makeToast('ERRO', 'Falha ao carregar os dados', 'danger');
            }
        },
        handleSubmit: async function () {
            try {
                const isFormValid = await this.$refs.observer.validate();
                if (!isFormValid) return;

                const projectService = new ProjectService();
                this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
                let payload = { projectId: this.form.projectid, feedback: this.form.feedback };
                if (this.form.selectedEvaluation?.value === 0) {
                    payload = { ...payload, status: 'AC' };
                    await projectService.evaluateProject(payload);
                } else if (this.form.selectedEvaluation?.value === 1) {
                    payload = { ...payload, status: 'RC' };
                    await projectService.evaluateProject(payload);
                } else if (this.form.selectedEvaluation?.value === 2) {
                    payload = { ...payload, status: 'RL', subjectId: this.form.selectedSubject.value };
                    await projectService.reallocateProject(payload);
                } else if (this.form.selectedEvaluation?.value === 3) {
                    payload = { ...payload, status: 'AL', subjectId: this.form.selectedSubject.value };
                    await projectService.reallocateProject(payload);
                }
                this.$store.commit('CLOSE_LOADING_MODAL');
                await this.$router.push({ path: `/projetos-disciplina` });
                this.makeToast('SUCESSO', 'Operação realizada com sucesso', 'success');
            } catch (error) {
                this.$store.commit('CLOSE_LOADING_MODAL');
                this.makeToast('ERRO', 'Falha ao realizar operação', 'danger');
            }
        },
        handleEvaluate: function () {
            this.form.feedback = '';
            this.toggleEnableForm();
        },
        handleCancelEvaluate: function () {
            this.form = JSON.parse(JSON.stringify(this.initialForm));
            this.toggleEnableForm();
        },
    },
}
