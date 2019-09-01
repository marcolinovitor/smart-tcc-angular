const cpfInvalids = [
    '00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
    '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'
];
const cnpjInvalids = [
    '00000000000000', '11111111111111', '22222222222222', '33333333333333', '44444444444444',
    '55555555555555', '66666666666666', '77777777777777', '88888888888888', '99999999999999'
];

export class Utils {

    validateDocument(doc: string): boolean {
        return doc.length <= 11 ? this.validateCpf(doc) : this.validateCnpj(doc);
    }


    validateCpf(cpf: string): boolean {
        if (!cpf || cpf.length != 11 || cpfInvalids.includes(cpf)) return true;
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return true;
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        }
        resto = (soma * 10) % 11;
        if ((resto == 10) || (resto == 11)) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return true;
        return false;
    }

    validateCnpj(cnpj: string): boolean {
        if (!cnpj || cnpj.length != 14 || cnpjInvalids.includes(cnpj)) return true;
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho)
        let digitos = cnpj.substring(tamanho)
        let soma = 0
        let pos = tamanho - 7
        for (let i = tamanho; i >= 1; i--) {
            soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--
            if (pos < 2) pos = 9
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != Number.parseInt(digitos.charAt(0))) return true;
        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        for (let i = tamanho; i >= 1; i--) {
            soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--
            if (pos < 2) pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (resultado != Number.parseInt(digitos.charAt(1))) return true
        return false;
    }

}

export const utils = new Utils();