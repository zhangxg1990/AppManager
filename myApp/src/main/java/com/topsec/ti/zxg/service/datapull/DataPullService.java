package com.topsec.ti.zxg.service.datapull;


import java.util.TimerTask;

public abstract class DataPullService extends TimerTask {
    public abstract void pullIpData();
    public abstract void pullIpDataAll();
    public abstract void executeUpdate();
    public abstract void executeDayUpdate();
}
