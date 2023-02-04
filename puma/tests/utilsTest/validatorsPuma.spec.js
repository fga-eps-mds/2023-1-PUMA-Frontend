import { validarCpf, validarCnpj, validarTelefone, clearMasks } from "../../src/utils/validators-puma";

describe('Clear Masks', () => {
    it('Should clear string masks', () => {
        expect(clearMasks('(61) 9 9999-9999')).toBe('61999999999')
    })
})

describe('validar CPF', () => {
    it('Should not validate cpf (wrong len)', () => {
        expect(validarCpf('000.000.000-0')).toBe(false);
    })

    it('Should not validate cpf (empty)', () => {
        expect(validarCpf('')).toBe(false);
    })

    it('Should not validate cpf (invalid)', () => {
        expect(validarCpf('811.722.090-00')).toBe(false);
    })

    it('Should validate cpf', () => {
        expect(validarCpf('811.722.090-30')).toBe(true);
    })
})

describe('validar CNPJ', () => {
    it('Should not validate cnpj (wrong len)', () => {
        expect(validarCnpj('000.000.000-0')).toBe(false);
    })

    it('Should not validate cnpj (empty)', () => {
        expect(validarCnpj('')).toBe(false);
    })

    it('Should not validate cnpj (invalid)', () => {
        expect(validarCnpj('85.863.945/0000-90')).toBe(false);
    })

    it('Should validate cnpj', () => {
        expect(validarCnpj('85.863.945/0001-90')).toBe(true);
    })
})

describe('validar Telefone', () => {
    it('Should not validate telefone (wrong len)', () => {
        expect(validarTelefone('(61) 9 99999')).toBe(false);
    })

    it('Should not validate telefone (empty)', () => {
        expect(validarTelefone('')).toBe(false);
    })

    it('Should not validate telefone (invalid ddd)', () => {
        expect(validarTelefone('(26) 9 9919 5863')).toBe(false);
    })

    it('Should not validate telefone (same digits)', () => {
        expect(validarTelefone('(61) 9 9999 9999')).toBe(false);
    })

    it('Should validate telefone', () => {
        expect(validarTelefone('(61) 9 9919 5863')).toBe(true);
    })
}) 