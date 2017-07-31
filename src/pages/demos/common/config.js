import $ from 'jquery';
import axios from 'axios';
import 'select2';
import 'select2/dist/js/i18n/zh-CN.js';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';


/**
 * id (初始化容器id)
 * url (接口地址)
 * rqData (请求参数对象)
 * typeId (区分Id)
 * typeName (区分name)
 */





const initSelect = function(id, url, typeMethods, rqData, selectType = false, typeId = 'id', typeName = 'name') {
    let resData = [];
    $(id).select2({
        multiple: selectType,
        allowClear: true,
        placeholder: "请选择",
        theme: "bootstrap",
        language: 'zh-CN',
        ajax: {
            transport: function(params, success, failure) {
                if (!rqData) {
                    rqData = {
                        name: params.data.term,
                        pageIndex: 1,
                        pageSize: 10
                    }
                }

                if (typeMethods == 'GET') {
                    console.log(1);
                    console.log(rqData);
                    if (!params.data.term) {
                        axios.get(url, {
                            params: rqData
                        }).then((res)=> {
                            success(res.data.result);
                        }).catch((err) => {
                            failure();
                        })
                        return false;
                    }

                    axios.get(url, {
                        params: rqData
                    }).then((res)=> {
                        success(res.data.result);
                    }).catch((err) => {
                        failure();
                    })
                }
                else {
                    if (!params.data.term) {
                        axios.post(url, rqData).then((res)=> {
                            success(res.data.result);
                        }).catch((err) => {
                            failure();
                        })
                        return false;
                    }

                    axios.post(url, rqData).then((res)=> {
                        success(res.data.result);
                    }).catch((err) => {
                        failure();
                    })
                }


            },
            processResults: function (data, params) {
                // 对返回结果进行处理
                let datas = [];
                for (let i = 0; i < data.length; i++) {
                    datas.push({
                        id: data[i][typeId],
                        text: data[i][typeName]
                    })
                }
                resData= datas.slice(0, 10);
                return {
                  results: resData
                };
            },
        },
        // 防JS注入
        escapeMarkup: function (markup) { return markup; },
        //minimumInputLength: 1,
        //显示当前选择的内容
        templateSelection(repo) {
            if (repo.loading){
                return repo.text;
            }
            if (repo.id) {
                for (let i = 0; i < resData.length; i++) {
                    if (resData[i].id == repo.id){
                        repo.text = resData[i].text;
                        break;
                    }
                }
            }
            var markup = `<span id='${repo.id}'>${repo.text}</span>`;
            return markup;
        },
        // 显示搜索的内容
        templateResult(repo) {
            if (repo.loading) {
                return repo.text;
            };
            var markup = `<span id='${repo.id}'>${repo.text}</span>`;
            return markup;
        }
    });
}


export {
    initSelect
}
