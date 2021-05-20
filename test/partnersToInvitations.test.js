import transform from '../src/transforms/partners-to-invitations/index.js';
import partnerData from './test-data/parners.js'; 
import invitationData from './test-data/invitations.js'; 
import chai from 'chai';

describe('Transform', function () {
    const transformedData = transform(partnerData);
    const correctlyTransformedData = invitationData;

    it('transforms correctly', function () {
        chai.expect(transformedData).to.deep.equal(correctlyTransformedData);
    });
});
