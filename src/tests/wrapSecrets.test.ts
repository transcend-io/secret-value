// external
import { expect } from 'chai';

// global
import { wrapSecrets } from '..';

describe('wrapSecrets', () => {
  it('wraps secrets by key name', () => {
    const obj = {
      cat: 2,
      fish: 'cow',
      moose: [2],
    };

    const secretObject = wrapSecrets(obj, ['fish']);

    expect(secretObject.cat).to.equal(2);
    expect(secretObject.moose[0]).to.equal(2);
    expect(secretObject.fish.release()).to.equal('cow');
  });
});
