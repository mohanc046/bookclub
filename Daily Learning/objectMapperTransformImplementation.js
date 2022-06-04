
import _ from 'lodash';

const transformActions = {

    itrDocument: (value, state) => {
  
      const documentList = _.get(state, 'itrDocumentVerificationHistory');
  
      let updatedDocumentList = [];
  
      documentList.map((item) => {
        if (_.get(item, 'key') == _.get(value, 'filedAssessmentYear')) {
          updatedDocumentList.push({
            ...item,
            note: _.get(item, 'status') ? 'VERIFIED' : 'NOT-VERIFIED',
            documentURL: _.get(item, 'documentURL')
          })
          return
        }
        updatedDocumentList.push(item)
      })
  
  
      return updatedDocumentList;
    }
  
  }

const successDataObjectMap = {
    'isDocumentVerified': 'isDocumentVerified',
    "documentURL": {
        key: 'documentURL',
        default: '',
    },
    "verifiedAssessmentYear": {
        key: 'verifiedAssessmentYear',
        default: ''
    },
    "itrDocumentVerificationHistory": {
        key: 'itrDocumentVerificationHistory',
        transformAction: 'itrDocument'
    }
}


let formattedObject = {};

let state = {
    defaultValues: []
}


for(let item in successDataObjectMap){

    console.log(item);

    if (
        _.isObject(successDataObjectMap[item])
        && Object(successDataObjectMap[item]).hasOwnProperty('transformAction')
    ) {


        let actionName = _.get(successDataObjectMap[item], 'transformAction'); /*?*/

        formattedObject[item] = {

            ...successDataObjectMap[item],

            transform: (value) => transformActions[actionName](value, state) /*?*/

        }
    }else{
       formattedObject[item] = successDataObjectMap[item];
    }
}


formattedObject /*?*/