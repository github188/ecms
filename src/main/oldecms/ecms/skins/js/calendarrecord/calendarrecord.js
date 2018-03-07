/**
 *   @name: 人事考勤日历
 *   @author: xiongxiaojun
 *   @createtime: 2017/8/2
 */
$.fn.calendarRecord = function (params) {
    $(this).empty();
    var edit = params.edit || false;
    var weekArr = ['日', '一', '二', '三', '四', '五', '六'];
    var year = params.year || new Date().getFullYear();
    var month = params.month || new Date().getMonth() + 1;
    var weekStr = "", dayStr = "";
    var DATE = new Date();
    for(var i = 0; i < weekArr.length; i++){
        weekStr+= '<li class="calendar-list calendar-week">周&nbsp;&nbsp;'+ weekArr[i] +'</li>'
    }
    $(this).append(weekStr);
    var dayArr = [];  //日期集合
    var data = params.data.content || []; //日期数据
    var activeDate = new Date(year, month - 1 , 1);
    var bf = true, af = false;
    activeDate.setDate(1);
    activeDate.setDate(1 - activeDate.getDay());

    var leaveType = params.leaveType;

    if(leaveType) {  //请假类型
        var leaveTypeObj = {};
        for (var type = 0; type < leaveType.length; type++) {
            var value = leaveType[type].value;   //考勤类型
            leaveTypeObj[value] = {
                name: leaveType[type].name,
                value: leaveType[type].value,
                style: (function () {

                    if (leaveType[type].value == 2 || value == 9) {  //加班
                        return {
                            bg: '#ffe6e6',
                            color: '#f46564'
                        }
                    }
                    if (leaveType[type].value == 3) {  //出差
                        return {
                            bg: '#fff1e1',
                            color: '#f8a64a'
                        }
                    }
                    if(leaveType[type].value == 10){ //外出
                        return {
                            bg: '#f7ebff',
                            color: '#c06dec'
                        }
                    }
                    if (value >= 4 && value != 9) {  //请假
                        return {
                            bg: '#e8f8ff',
                            color: '#4bb5f8'
                        }
                    }
                    return {   //正常
                        bg: '#e8fff6',
                        color: '#23d183'
                    }
                })()
            }
        }
    }
    for (var j = 0; j < 42; j++) {
        var $date = activeDate.getDate();
        if ($date == 1) {
            if (bf) {
                bf = false;
            } else {
                af = true;
            }
        }
        activeDate.setDate($date + 1);
        var dayInfo = {   //每天对应的信息
            date: $date,
            day: [year, month, ($date.toString()).length == 1?'0'+$date:$date].join('-'),
            record: {
                name: '',
                klass: 'disabled'
            }
        };

        if(af || bf){
            dayInfo.disabled = true;   //是否本月日历之外
        }
        var tempDay = [];
        for(var day = 0; day < data.length; day++){   //获取当月数据
            var $day =  data[day];
            var dayList = $day.dayList;

            if( [year, month, $date].join('-').toTime()  == ($day.date).toTime() ){
                tempDay.push({
                    date: $day.date,  //日期
                    fristTime: $day.fristTime,
                    lastTime: $day.lastTime,
                    status: $day.status,
                    dayList: dayList
                });
            }
        }

        if ((j) % 7 == 0 || (j+1) % 7 == 0) {  //周六或周日
            // dayInfo.record.name = "休息";
            // dayInfo.record.klass = 'enabled';
            if((j) % 7 == 0){
                dayInfo.last = 'weekend diurnal';
            }else{
                dayInfo.last = 'weekend sat';
            }
            dayInfo.rest = true;
        }

        // var toDayYear = [DATE.getFullYear(), DATE.getMonth() + 1, 0].join('-').toTime();
        // var dayYear = [year, month, 0].join('-').toTime();
        // if($date > new Date().getDate()  && toDayYear == dayYear){   //不可用
        //     dayInfo.record =  {
        //         name: '',
        //         klass: 'disabled',
        //         abc: '大于',
        //         type: 0,
        //         half: false
        //     }
        // }

        for(var temp = 0; temp < tempDay.length; temp++ ){
            var dayList = tempDay[temp].dayList;
            var sign = {};
            var fristTime = tempDay[temp].fristTime;
            var lastTime = tempDay[temp].lastTime;
            var status = tempDay[temp].status;

            if(status == 0){
                sign.noPunch = ['未打卡', '#ed6b6a']
            }else if(status == 1){  //未签退
                sign.early = [fristTime, '#bdbdbd'];
                sign.night = ['未签退', '#ed6b6a'];
            }else if(status == 2){//未签到
                sign.early = ['未签到', '#ed6b6a'];
                sign.night = [lastTime, '#bdbdbd'];

            }else if(status == 3){ //完美
                sign.early = [fristTime, '#bdbdbd'];
                sign.night = [lastTime, '#bdbdbd'];
            }

            var _sign = sign;
            if(sign.noPunch){
                _sign = {};
            }

            if(dayList){   //非正常情况
                if(dayList.length == 1){  // 非正常全天
                    var style = leaveTypeObj[dayList[0].type];
                    if(dayList[0].type == -1){

                        dayInfo.record = {
                            id: dayList[0].id,
                            time: dayList[0].time,
                            name: '',
                            type: -1,
                            bg: '',
                            color: '',
                            sign: _sign,
                            klass: 'enabled',
                            half: false,
                            remark: dayList[0].remark
                        }
                    }else{
                        dayInfo.record = {
                            id: dayList[0].id,
                            time: dayList[0].time,
                            name: style.name,
                            type: style.value,
                            bg: style.style.bg,
                            color: style.style.color,
                            sign: sign,
                            klass: 'enabled',
                            half: false,
                            remark: dayList[0].remark
                        }
                    }
                }else if(dayList.length >= 2){   //多条数据
                    dayInfo.record = [];
                    for(var g = 0; g < dayList.length; g++){
                        var style = leaveTypeObj[dayList[g].type];
                        if(dayList[0].type == -1){
                            dayInfo.record.push({
                                id: dayList[g].id,
                                time: dayList[g].time,
                                name: '',
                                type: -1,
                                bg: '',
                                color: '',
                                sign: _sign,
                                klass: 'enabled',
                                half: true,
                                remark: dayList[g].remark
                            })

                        }else{
                            dayInfo.record.push({
                                id: dayList[g].id,
                                time: dayList[g].time,
                                name: style.name,
                                type: style.value,
                                bg: style.style.bg,
                                color: style.style.color,
                                sign: sign,
                                klass: 'enabled',
                                half: true,
                                remark: dayList[g].remark
                            })
                        }
                    }
                }
            }else{
                var toDayYear = [DATE.getFullYear(), DATE.getMonth() + 1, 0].join('-').toTime();
                var dayYear = [year, month, 0].join('-').toTime();
                if($date > new Date().getDate()  && toDayYear == dayYear){   //大于当前日期为不可用
                    dayInfo.record =  {
                        name: '',
                        klass: 'disabled',
                        type: 0,
                        half: false
                    }
                }
                // else if(dayInfo.rest){  //周末休息
                //     dayInfo.record =  {
                //         name: '休息',
                //         sign:sign,
                //         half: false
                //     }
                // }
                else{
                    dayInfo.record =  {
                        name: '正常',
                        type: 0,
                        bg: '#e8fff6',
                        color: '#23d183',
                        sign:sign,
                        klass: 'enabled',
                        half: false
                    }

                }
            }
        }
        dayArr.push(dayInfo);
    }
    for(var w = 0; w < dayArr.length; w++){
        var item = dayArr[w];
        var record = item.record;
        var color = record.color;
        var bg = record.bg;
        var name = record.name;
        var remark = !!record.remark;
        dayStr+= '<li class="calendar-list '+(item.last?item.last:'workday')+'" >';
        if(dayArr[w].disabled){  //在本月日历之外的
            dayStr+= '<div class="disabled"><span class="date"></span></div>'
        }else{
            var editLog = "";
            if(remark){
                editLog+= "<div class='edit-log'>";
                var remark = record.remark.split('##');
                editLog+= '<p>时间:&nbsp;&nbsp;'+ remark[2] +'</p>';
                editLog+= '<p>事项:&nbsp;&nbsp;'+ remark[0] +' </p>';
                editLog+= '<p>原因:&nbsp;&nbsp;'+ remark[1] +'</p>';
                editLog+='</div>';
            }
            // if(edit && record.klass != 'disabled'){
            //     if(remark && !record.more){
            //         dayStr+= '<div class="'+ record.klass +' edit-parent"><div class="edit-tag"></div>'+ editLog +'';
            //     }else{
            //         dayStr+= '<div class="'+ (record && record.klass || record[0].klass) +' edit-parent">';
            //     }
            // }else{

            // }
            if(remark && !record.more){
                dayStr+= '<div class="'+ record.klass +' edit-parent"><div class="edit-tag"></div>'+ editLog +'';
            }else{
                dayStr+= '<div class="'+ record.klass +' edit-parent">';
            }
            if(record.more){   // 两个非正常半天
                dayStr+= '<div class="calendar-list-box calendar-list-half">';
                for(var k in record){
                    if(record[k].name){
                        dayStr+= '<div class="double-half edit-parent"  style="background-color:'+ record[k].bg +'" >';
                        if(remark){
                            dayStr+= '<div class="name" style="color: '+ record[k].color +'">'+ record[k].name +'</div><div class="edit-tag"></div>'+ editLog +'';
                        }else{
                            dayStr+= '<div class="name" style="color: '+ record[k].color +'">'+ record[k].name +'</div>';
                        }
                    }
                    dayStr+= '</div>'
                }
                dayStr+= '</div>';
            }else{
                var sign = record.sign ||  record[0] && record[0].sign;
                if(jQuery.isArray( record )){  //两个半天
                    dayStr+= '<div class="calendar-list-box calendar-list-all">';
                    var name0 = record[0].name;
                    if(record[0].time == 0.5){  //半天
                        name0 += '0.5';
                    }
                    var name1 = record[1].name;
                    if(record[1].time == 0.5){  //半天
                        name1 += '0.5';
                    }
                    if(edit && record.klass != 'disabled'){
                        dayStr+= '<div class="name edit-calendar" title="修改考勤" data-id="'+ (record[0].id?record[0].id:'') +'" data-date="'+ item.day +'" style="cursor:pointer; color:'+ record[0].color +'; background-color: '+ record[0].bg +'">'+ name0 +'</div>';
                        dayStr+= '<div class="name edit-calendar" title="修改考勤" data-id="'+ (record[1].id?record[1].id:'') +'" data-date="'+ item.day +'" style="cursor:pointer; top: 54px; color:'+ record[1].color +'; background-color: '+ record[1].bg +'">'+ name1 +'</div>';
                    }else{
                        dayStr+= '<div class="name" style="color:'+ record[0].color +'; background-color: '+ record[0].bg +'">'+name0 +'</div>';
                        dayStr+= '<div class="name" style="top: 54px; color:'+ record[1].color +'; background-color: '+ record[1].bg +'">'+ name1 +'</div>';
                    }
                    dayStr+= '<span class="date">'+ item.date +'</span>';
                }else{  // 正常全天/半天或非正常全天/半天
                    var name = record.name;
                    if(record.time == 0.5){  //半天
                        name += '0.5';
                    }
                    dayStr+= '<div class="calendar-list-box calendar-list-all">';
                    if(edit && record.klass != 'disabled'){
                        dayStr+= '<div class="name edit-calendar" title="修改考勤" data-id="'+ (record.id?record.id:'') +'" data-date="'+ item.day +'" style="cursor:pointer; color:'+ color +'; background-color: '+ bg +'">'+ name +'</div>';
                    }else{
                        dayStr+= '<div class="name" style="color:'+ color +'; background-color: '+ bg +'">'+ name +'</div>';
                    }
                    dayStr+= '<span class="date">'+ item.date +'</span>';
                }
                if(sign){
                    if(sign.noPunch){
                        dayStr+= '<span class="sign no-punch" style="color:'+ sign.noPunch[1] +'">'+ sign.noPunch[0] +'</span>';
                    }else if(sign.early ||　sign.night){
                        dayStr+= '<span class="sign early" style="color:'+ sign.early[1] +'">'+ sign.early[0] +'</span>';
                        dayStr+= '<span class="sign night" style="color:'+ sign.night[1] +'">'+ sign.night[0] +'</span>';
                    }
                }
                dayStr+= '</div>';
            }
        }
    }
    $(this).append(dayStr);

    $('.edit-log').each(function (a, b) {
        if( $(b).parents('li').hasClass('sat')){
            $(b).css('left', '-100%');
        }
    }).parent('.edit-parent').on('mouseover', function () {
        $(this).find('.edit-log').stop().fadeIn(300);
    }).on('mouseout', function () {
        $(this).find('.edit-log').stop().fadeOut(200);
    });
    if(edit){
        $('#calendarTable').on('click', '.edit-calendar', function () {  //修改
            var date = $(this).attr('data-date');
            var id = $(this).attr('data-id');
            edit(date, id);
        })
    }
};