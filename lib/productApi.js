import config from '../config';
import { generateQueryString } from '../lib/utils';
import parseXML from 'react-native-xml2js';

const credentials = {
    awsId: config.aws.id,
    awsSecret: config.aws.secret,
    awsTag: config.aws.tag
};

var ProductApi = {

    checkAvailability: (itemId, callback) => {

        var string = generateQueryString({ItemId: itemId}, 'ItemLookup', credentials);
        console.log(string);

        return fetch(string)
            .then(response => response.text())
            .then(responseXML => parseXML.parseString(responseXML, {explicitArray: false}, (err, res) => {
                    console.log(res);
                    let bool = false;

                    if (res.ItemLookupResponse.Items.hasOwnProperty('Item')) {
                        console.log(res.ItemLookupResponse.Items.Item.OfferSummary.TotalNew)
                        bool = (res.ItemLookupResponse.Items.Item.OfferSummary.TotalNew > 0)
                    }

                    callback(bool);
                })
            )
            .catch((error) => {
                console.error(error);
            });
    },

    searchProducts: (value, callback) => {

        var string = generateQueryString({ Keywords: value }, 'ItemSearch', credentials);

        console.log(string);

        fetch(string)
            .then(response => response.text())
            .then(responseXML => {
                parseXML.parseString(responseXML, {explicitArray: false}, (err, res) => {
                    callback(res);
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export default ProductApi;
