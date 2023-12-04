"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// external
const chai_1 = require("chai");
// global
const __1 = require("..");
describe('wrapSecrets', () => {
    it('wraps secrets by key name', () => {
        const obj = {
            cat: 2,
            fish: 'cow',
            moose: [2],
        };
        const secretObject = (0, __1.wrapSecrets)(obj, ['fish']);
        (0, chai_1.expect)(secretObject.cat).to.equal(2);
        (0, chai_1.expect)(secretObject.moose[0]).to.equal(2);
        (0, chai_1.expect)(secretObject.fish.release()).to.equal('cow');
    });
});
//# sourceMappingURL=wrapSecrets.test.js.map