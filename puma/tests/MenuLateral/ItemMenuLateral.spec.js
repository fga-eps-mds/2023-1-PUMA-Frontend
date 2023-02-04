import MenuLateral from '../../src/components/shared/menu-lateral/menu-lateral'
import store from '../../src/store' 
import router from '../../src/router'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import onclick from '../../src/components/shared/menu-lateral/menu-lateral'

const localVue = createLocalVue();

describe('Get Menu Lateral Data', () => {
    it('Should get menu lateral data', () => {
        const wrapper = shallowMount(MenuLateral, {
            localVue,
            router,
            store,
        });
        const functions = {
            show: () => 'true',
            onclick: () => 'true',
        }

        let response = {
            adminProjects: {
                basePath: "/projetos-plataforma", 
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Projetos"
            }, 
            classItem: {
                basePath: "/turmas", 
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Turmas"
            }, 
            keywords: {
                basePath: "/palavras-chave", 
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Palavras-Chave"
            }, 
            logout: {
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Sair"
            }, 
            myProjects: {
                basePath: "/meus-projetos", 
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Meus Projetos"
            }, 
            subjectProjects: {
                basePath: "/projetos-disciplina", 
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Projetos das Disciplinas"
            }, 
            subjects: {
                basePath: "/disciplinas", 
                iconUrl: "", 
                onclick: functions.onclick, 
                show: functions.show, 
                title: "Disciplinas"
            }
        }
        expect(wrapper.vm.user).toStrictEqual({});
        expect(wrapper.vm.menuItems.toString()).toStrictEqual(response.toString())
    })
})