import { assert } from 'chai';
import { sayHello } from './sayHello';

describe('Test', () => {
  it('sayHello', () => {
    assert.equal(
      sayHello(),
      'Привет!',
    );
  });
});
