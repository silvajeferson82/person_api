function countVogais(string, callback) {
  const vogais = ['a', 'e', 'i', 'o', 'u'];
  const stringLowerCase = string.toLowerCase();
  let contador = 0;

  for (let i = 0; i < stringLowerCase.length; i++) {
    if (vogais.includes(stringLowerCase[i])) {
      contador++;
    }
  }

  callback(contador);
}


function callback(resultado) {
  console.log("Total de vogais -> " + resultado);
}

const value = "Casa na praia!";
countVogais(value, callback);