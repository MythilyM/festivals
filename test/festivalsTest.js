const api = require("../utils/commonMethods");
const config = require("../config.json");
const expect = require("chai").expect;


const baseUrl = config.baseUrl;
const _headers = "";

describe('GET festivals', () => {
    var resp, respbody, statcode;
    //Unable to use API call for each test as too many req causing Throttling.
    // beforeEach(async () => {
    //     res = await api.GET(baseUrl + "/festivals", _headers);
    // });

    it('GET response', async () => {
        var res = await api.GET(baseUrl + "/festivals", _headers);
        resp = JSON.parse(JSON.stringify(res));
        statcode = resp.statcode;
        respbody = JSON.stringify(resp.body);
        console.log("respbody = ", respbody);
    });

    if (statcode != 429) {
        it('verify the endpoint returns OK status', () => {
            expect(resp.statusCode, 'status not OK').equal(200);
        });

        it('verify the response body is not empty', () => {
            // console.log("resp = ", resp);
            expect(resp.body).is.not.empty;
        });

        it('verify the response type', () => {
            console.log("respbody = ", respbody);
            for (let i in respbody) {
                expect(resp.body[i]).to.have.property('name').that.is.a('string');
                for (let j in respbody.bands) {
                    expect(resp.body[i]).bands[j].to.have.property('name').that.is.a('string');
                    expect(resp.body[i]).bands[j].to.have.property('recordLabel').that.is.a('string');
                }
            }
        });

        //Validation of data is not possible since it is dynamic and needs more understanding of the logic on how to be valdiated here.
        xit('verify the response values', () => {
            // for(let i in respbody) {
            //     expect(resp.body[i]).to.have.property('name').is.in('LOL-palooza', 'Wrong name');
            //     for(let j in respbody.bands) {
            //         expect(resp.body[i]).bands[j].to.have.property('name').that.is.in('The Black Dashes','cvcvcv');
            //         expect(resp.body[i]).bands[j].to.have.property('recordLabel').that.is.in('ACR', "Pacific Records");
            //     }
            // }
        });
    }

    if (statcode == 429) {
        it('verify throttling response when too many req in minimum time', () => {
            expect(resp.statusCode, 'status not throttling').equal(429);
            expect(respbody).to.equal('Too many requests, throttling')
        })
    }
});