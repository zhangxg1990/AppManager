package com.topsec.ti.zxg.dto;

import com.topsec.ti.zxg.domain.alert.AlertDisposalInfo;

public class DtoActiviti {
    private String taskId;
    private String processId;
    private String owner;
    private AlertDisposalInfo alertDisposalInfo;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public AlertDisposalInfo getAlertDisposalInfo() {
        return alertDisposalInfo;
    }

    public void setAlertDisposalInfo(AlertDisposalInfo alertDisposalInfo) {
        this.alertDisposalInfo = alertDisposalInfo;
    }
}
