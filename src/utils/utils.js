export default {
    dateFormat: (date, format) => {
        if (typeof date === 'string') {
            date = parseInt(date, format);
        }
        date = new Date(date);
        const map = {
            "M": date.getMonth() + 1,                   //月份
            "d": date.getDate(),                        //日
            "h": date.getHours(),                       //小时
            "m": date.getMinutes(),                     //分
            "s": date.getSeconds(),                     //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()                 //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            let v = map[t];
            if(v !== undefined){
                if(all.length > 1){
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            }
            else if(t === 'y'){
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    },
    getDateDiff: function (date){
        let now = new Date().getTime();
        let diffValue = now - (new Date(date)).getTime();
        if(diffValue < 0) {return;}
        let yearC = diffValue / (365 * 1000 * 60 * 60 * 24 )
        let monthC = diffValue / (30 * 1000 * 60 * 60 * 24 );
        let weekC = diffValue / (7 * 1000 * 60 * 60 * 24);
        let dayC = diffValue / (1000 * 60 * 60 * 24);
        let hourC = diffValue / (1000 * 60 * 60);
        let minC = diffValue / (1000 * 60);
        let result = "";
        if(yearC >=1 ){
            result="" + parseInt(yearC) + "年前";
        }
        else if(monthC >= 1){
            result="" + parseInt(monthC) + "个月前";
        }
        else if(weekC >= 1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC >= 1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC >= 1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC >= 1){
            result=""+ parseInt(minC) +"分钟前";
        }else
        result="刚刚";
        return result;
    }
}