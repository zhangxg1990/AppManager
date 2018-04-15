package com.topsec.ti.zxg.timer;


import com.topsec.ti.zxg.service.datapull.DataPullService;

import java.util.Calendar;
import java.util.Date;
import java.util.Timer;

public class TimerManager {

    /**
     * @param args
     */
    public static void main(String[] args) {
        new TimerManager(null);
    }

    //时间间隔(一天)
    private static final long PERIOD_DAY = 24 * 60 * 60 * 1000;
    public TimerManager(DataPullService iplocateService) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 1); //凌晨1点
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Date date=calendar.getTime(); //第一次执行定时任务的时间
        if (date.before(new Date())) {
            date = this.addDay(date, 1);
        }
        Timer timer = new Timer();
        //安排指定的任务在指定的时间开始进行重复的固定延迟执行。
        timer.schedule(iplocateService,date,PERIOD_DAY);
    }
    // 增加或减少天数
    public Date addDay(Date date, int num) {
        Calendar startDT = Calendar.getInstance();
        startDT.setTime(date);
        startDT.add(Calendar.DAY_OF_MONTH, num);
        return startDT.getTime();
    }

}