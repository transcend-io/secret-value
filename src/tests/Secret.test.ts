// external
import { expect } from 'chai';

import { inspect } from 'util';

// global
import { Secret } from '..';

describe('Secret', () => {
  it('can wrap a string value', () => {
    const secret = new Secret('ahhhhhh');
    expect(secret.release()).to.equal('ahhhhhh');
  });

  it('can wrap objects', () => {
    const someObject = {
      ahhhhhh: 'ahhhhhh',
    };

    const secret = new Secret(someObject);
    expect(secret.release()).to.deep.equal(someObject);
  });

  it('redacts the values when converted to string', () => {
    const secret = new Secret('ahhhhhh');
    expect(`${secret}`).to.equal('[redacted]');
  });

  it('redacts values in JSON stringification', () => {
    const secret = new Secret('ahhhhhh');
    expect(JSON.stringify({ secret })).to.equal('{"secret":"[redacted]"}');
  });

  it('redacts values in localized format', () => {
    const secret = new Secret('ahhhhhh');
    expect(secret.toLocaleString()).to.equal('[redacted]');
  })

  it('redacts values called with valueOf', () => {
    const secret = new Secret('ahhhhhh');
    expect(secret.valueOf()).to.equal('[redacted]');
  })

  it('redacts values in console.log format', () => {
    const secret = new Secret('ahhhhhh');
    expect(inspect(secret)).to.equal('[redacted]');
  })

  describe('map', () => {
    it('can create a new secret value', () => {
      const secret = new Secret('GME');
      expect(secret.map(() => '🌙').release()).to.equal('🌙');
    });

    it('can create a new secret value of a different type', () => {
      const secret = new Secret('ahhhhhh');
      expect(secret.map((val) => val.length).release()).to.equal(7);
    });

    it('does not affect the original secret', () => {
      const secret = new Secret('ahhhhhh');
      secret.map((val) => val.length);
      expect(secret.release()).to.equal('ahhhhhh');
    });
  });
});
