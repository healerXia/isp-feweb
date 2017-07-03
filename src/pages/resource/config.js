import axios from 'axios';

const mediaNameList = [
    "易车网",
    "易车二手车",
    "易车网专题投放",
    "易车软性资源"
];

const pageTypeList = [
    "公共页",
    "品牌页",
    "车型页",
    "省区页",
    "省区车型页",
    "城市页",
    "城市车型页",
    "论坛资源页"
]

const initSelect = function(id, url, rqData, typeId, typeName) {
    $(id).select2({
        multiple: true,
        allowClear:true,
        ajax: {
            transport: function(params, success, failure) {
                if (!params.data.term) {
                    rqData.name = '';
                    axios.post(url, rqData).then((res)=> {
                        success(res.data.result);
                    }).catch((err) => {
                        failure();
                    })
                    return false;
                }
                rqData.name = params.data.term;
                axios.post(url, rqData).then((res)=> {
                    success(res.data.result);
                }).catch((err) => {
                    failure();
                })


            },
            processResults: function (data, params) {
            let datas = [];
            for (let i = 0; i < data.length; i++) {
                datas.push({
                    id: data[i][typeId],
                    text: 'text',
                    name: data[i][typeName]
                })
            }
            let searchData = datas.slice(0, 10);
              return {
                  results: searchData
              };
            },
        },
        escapeMarkup: function (markup) { return markup; },
        //minimumInputLength: 1,
        templateSelection(repo) {
            if (repo.loading){

            }
            var markup = `<span id='${repo.id}'>${repo.name}</span>`;
            return markup;
        },
        templateResult(repo) {
            if (repo.loading) {
                // $("#select2_sample").select2({
                //     data: [{id:0, text:'text',name: '无结果'}]
                // })
            };
            var markup = `<span id='${repo.id}'>${repo.name}</span>`;
            return markup;
        }
    });
}

const urlList = {
  getInfo:'/isp-kongming/project/getInfo'
}

export {
    mediaNameList,
    pageTypeList,
    urlList,
    initSelect
}
