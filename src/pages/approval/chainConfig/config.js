import axios from 'axios';
import 'select2';
import 'select2/dist/js/i18n/zh-CN.js';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';




//const initSelect = function(id, url, rqData) {
const initSelect = function(id, data) {


    let resData = data.map(item => {
        return {
            id: item.groupId,
            name: item.groupName,
            text: item.groupName
        }
    });

    resData.unshift({
        id: '',
        name: '',
        text: ''
    })

    $(id).select2({
        allowClear:true,
        placeholder: "请选择",
        theme: "bootstrap",
        language: 'zh-CN',
        //data: resData,
        escapeMarkup: function (markup) { return markup; },
        //minimumInputLength: 1,
        templateSelection(repo) {
            if (repo.loading){
                return repo.text;
            }

            for (let i = 0; i < resData.length; i++) {
                if (resData[i].id == repo.id){
                    repo.name = resData[i].name;
                    break;
                }
            }
            if (!repo.name) {
                repo.name = '请输入';
            }

            var markup = `<span value='${repo.name}' id='${repo.id}'>${repo.name}</span>`;
            return markup;
        },
        templateResult(repo) {
            if (repo.loading) {
                return repo.text;
            };
            var markup = `<span value='${repo.name}' id='${repo.id}'>${repo.name}</span>`;
            return markup;
        }
    });

    // $(id).select2({
    //     allowClear:true,
    //     placeholder: "请选择",
    //     theme: "bootstrap",
    //     language: 'zh-CN',
    //     ajax: {
    //         transport: function(params, success, failure) {
    //             rqData.groupName = params.data.term;
    //             axios.get(url, {
    //                 params: rqData
    //             }).then((res)=> {
    //                 success(res.data.result.resultList);
    //                 // callback && callback();
    //             }).catch((err) => {
    //                 failure();
    //             })
    //
    //
    //         },
    //         processResults: function (data, params) {
    //             let datas = [];
    //             for (let i = 0; i < data.length; i++) {
    //                 datas.push({
    //                     id: data[i]['groupId'],
    //                     text: 'text',
    //                     name: data[i]['groupName']
    //                 })
    //             }
    //             resData = datas.slice(0, 10);
    //             return {
    //               results: resData
    //             };
    //         },
    //     },
    //     escapeMarkup: function (markup) { return markup; },
    //     //minimumInputLength: 1,
    //     templateSelection(repo) {
    //         if (repo.loading){
    //             return repo.text;
    //         }
    //
    //         for (let i = 0; i < resData.length; i++) {
    //             if (resData[i].id == repo.id){
    //                 repo.name = resData[i].name;
    //                 break;
    //             }
    //         }
    //         if (!repo.name) {
    //             repo.name = '请输入';
    //         }
    //
    //         var markup = `<span id='${repo.id}'>${repo.name}</span>`;
    //         return markup;
    //     },
    //     templateResult(repo) {
    //         if (repo.loading) {
    //             return repo.text;
    //         };
    //         var markup = `<span id='${repo.id}'>${repo.name}</span>`;
    //         return markup;
    //     },
    //     initSelection: function (element, callback) {
    //           var data = [{ id: 1, name: "Country Name" }];
    //           callback(data);
    //     }
    // });
}


export {
    initSelect
}
