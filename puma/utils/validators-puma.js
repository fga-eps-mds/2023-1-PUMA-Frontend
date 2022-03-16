function clearMasks(maskedValue) {
  return maskedValue.replace(/_|-|\(|\)|\.|\/|\s/g, '');
}

export function validarCpf(value) {
  const cpf = clearMasks(value);
  if (!cpf || cpf.length !== 11
    || cpf === '00000000000'
    || cpf === '11111111111'
    || cpf === '22222222222'
    || cpf === '33333333333'
    || cpf === '44444444444'
    || cpf === '55555555555'
    || cpf === '66666666666'
    || cpf === '77777777777'
    || cpf === '88888888888'
    || cpf === '99999999999') {
    return false;
  }

  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i += 1) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }
  soma = 0;
  for (let i = 1; i <= 10; i += 1) {
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) {
    resto = 0;
  }

  return resto === parseInt(cpf.substring(10, 11), 10);
}

export function validarCnpj(value) {
  const cnpj = clearMasks(value);

  if (!cnpj || cnpj.length !== 14
    || cnpj === '00000000000000'
    || cnpj === '11111111111111'
    || cnpj === '22222222222222'
    || cnpj === '33333333333333'
    || cnpj === '44444444444444'
    || cnpj === '55555555555555'
    || cnpj === '66666666666666'
    || cnpj === '77777777777777'
    || cnpj === '88888888888888'
    || cnpj === '99999999999999') {
    return false;
  }

  let cnpjCalc = cnpj.substring(0, 12);
  const charCnpj = cnpj.split('');
  let soma = 0;
  let dig;

  for (let i = 0; i < 4; i += 1) {
    if (charCnpj[i].charCodeAt(0) - 48 >= 0 && charCnpj[i].charCodeAt(0) - 48 <= 9) {
      soma += (charCnpj[i].charCodeAt(0) - 48) * (6 - (i + 1));
    }
  }

  for (let i = 0; i < 8; i += 1) {
    if (charCnpj[i + 4].charCodeAt(0) - 48 >= 0 && charCnpj[i + 4].charCodeAt(0) - 48 <= 9) {
      soma += (charCnpj[i + 4].charCodeAt(0) - 48) * (10 - (i + 1));
    }
  }

  dig = 11 - (soma % 11);
  cnpjCalc += dig === 10 || dig === 11 ? '0' : dig.toString();
  soma = 0;

  for (let i = 0; i < 5; i += 1) {
    if (charCnpj[i].charCodeAt(0) - 48 >= 0 && charCnpj[i].charCodeAt(0) - 48 <= 9) {
      soma += (charCnpj[i].charCodeAt(0) - 48) * (7 - (i + 1));
    }
  }
  for (let i = 0; i < 8; i += 1) {
    if (charCnpj[i + 5].charCodeAt(0) - 48 >= 0 && charCnpj[i + 5].charCodeAt(0) - 48 <= 9) {
      soma += (charCnpj[i + 5].charCodeAt(0) - 48) * (10 - (i + 1));
    }
  }
  dig = 11 - (soma % 11);
  cnpjCalc += dig === 10 || dig === 11 ? '0' : dig.toString();

  return cnpj === cnpjCalc;
}
