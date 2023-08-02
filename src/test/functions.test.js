import { opModule, palindrome } from './functionsTarget.js';
import assert from 'assert';

describe('Operacion modulo', () => {
  it('2/2 deberia retornar cero', () => {
    assert.equal(opModule(2, 2), 0);
  });
  it('0/2 Deberia retornar cero', () => {
    assert.equal(opModule(0, 2), 0);
  });
  it('2/0 Deberia retornar undefined/null', () => {
    assert.equal(opModule(2, 0), undefined || null);
  });
});

describe('Palindromo de una palabra o frase', () => {
  it('Palabra : diego , deberia retornar : ogeid', () => {
    assert.equal(palindrome('diego'), 'ogeid');
  });
  it('Parametro nulo, deberia devolver string vacio', () => {
    assert.equal(palindrome(), '');
  });
});
