/**
 * Created by Administrator on 2017/1/23.
 */
(function () {

    /**
     * 用户vo模型
     * 用户 id、登录用户名 name（必填）、密码 password、创建的用户名 alias、
     * 资源类型、resourceType、
     * 说明 note、授权角色 roles（角色名称的字符串）、角色名字列表字符串 rolesNames、
     * 用户权限 authority、权限列表名字字符串authorityNames、创建时间 createTime、
     * 更新时间 updateTime 、创建时间备份 createdTimeCopy
     * **/
    function User(){
        var _this = this;
        _this.id = "";_this.name = "";_this.password = "";_this.alias = "";
        _this.resourceType = "";_this.note = "";_this.dtoRoles = [];
        _this.rolesNames = "";_this.authorities = [];_this.authorityNames = "";
        _this.createdTime = "";_this.lastModifiedTime = "";
        _this.createdTimeCopy = "";
    }

    /**
     * 角色Vo模型
     * 真实的角色模型，提交数据的时候必须是这几个属性，否则会报错
     * id、角色名称 name、别名 alias、角色描述 note、资源类型 resourceType
     * 角色权限 dtoAuthorities、创建时间 createdTime、更新时间、lastModifiedTime
     * **/
    function Role(){
        var _this = this;
        _this.id = "";
        _this.name = "";
        _this.alias = "";
        _this.note = "";
        _this.resourceType = "";
        _this.dtoAuthorities = [];      // [authorityVo,authorityVo,authorityVo...]
        _this.createdTime = "";
        _this.lastModifiedTime = "";
    }
    
    /**
     * 页面展示的角色vo模型
     * ----页面展示的所有数据，包括角色Vo模型Role()的数据 和其他一些页面上用到的数据
     * 在角色vo模型的基础上增加了一个参数 authorityNames 权限名字拼的字符串
     * **/
    function RoleShow(){
        var _this = this;
        _this.id = "";
        _this.name = "";
        _this.alias = "";
        _this.note = "";
        _this.resourceType = "";
        _this.dtoAuthorities = [];      // [authorityVo,authorityVo,authorityVo...]
        _this.authorityNames = "";
        _this.createdTime = "";
        _this.lastModifiedTime = "";
    }
    /**
     * 权限Vo模型；；；；；功能模块绑定的权限对应的vo模型
     * 提交数据的时候就是这个格式，这个格式不能修改
     * **/
    function Authority(){
        var _this = this;
        _this.id = "";
        _this.name = "";
        _this.alias = "";
        _this.uri = "";
        _this.httpMethod = "POST";      //POST GET ....
    }
    /**
     * 页面展示的权限Vo模型
     * ----------数据包括权限Vo模型Authority()的所有数据和一些页面用到的数据
     * 在vo模型的基础上增加了两个属性：checked 是否被选择、children 子分组
     * **/
    function AuthorityShow(){
        var _this = this;
        _this.id = "";_this.name = "";_this.alias = "";
        _this.uri = "";_this.httpMethod = "POST";      //POST GET ...
        _this.checked = false;
        _this.children = [];
    }

    /**
     * 策略vo模型
     * **/
    function Policy() {
        var _this = this;
        _this.id = "";
        _this.alias = "";
        _this.dtoPolicyTypes = "";
        _this.ordinal = "";
    }
    
    /**
     * 设备vo模型
     * 设备id device_id  设备的父id parent_id  设备类型 device_type
     * 设备管理区域信息，管理中心的设备信息 level_info 设备层级 level_class
     * 检测器内存总量 mem_total  检测器cpu信息 cpu_info 检测器磁盘信息 disk_info
     * 产品软件版本号 soft_version  设备配置信息 interface_info
     * 管理中心部署单位名称 organs  管理中心部署位置信息 address
     * **/
    function Device(){
        var _this = this;
        _this.device_id = "";_this.parent_id = "";_this.device_type = "";
        _this.level_info = 0;_this.level_class = 0;_this.mem_total = 0;
        _this.cpu_info = "";_this.disk_info = "";_this.soft_version = "";
        _this.interface_info = "";_this.organs = "";_this.address = "";
    }

    /**
     * 网络行为审计  VO 模型
     * 包括：通联关系审计 NetConn、WEB应用行为审计 WebAction、SSL访问行为审计 SSLAction
     * 电子邮件行为审计 EMailAction 、文件传输行为审计 FtpAction、
     * DNS域名请求行为审计 DnsAction
     * **/
    //-----------------------------
    /**
     * 通联关系审计 NetConn vo模型
     * deviceId 设备、检测器ID
     * 序号 id 、_this.id = "";  源ip地址 sip 、源端口号 sport、源MAC地址 smac、目的ip dip、
     * 目的端口 dport 、目的mac dmac、传输层协议 protocol、
     * 应用协议 app、TCP流标记 tcp_flag、流入数据字节 in_bytes、流出数据字节 out_bytes、
     * 流入包个数 in_pkts、流出包个数 out_pkts、采集到第一个报文的时间 start_time、
     * 采集到最后一个报文的时间 end_time、审计产生日期 cap_date （格式:yyyy-MM-dd）
     * **/
    function NetConnAudit(){
        var _this = this;
        _this.deviceId = "";
        _this.sip = "";_this.sport = 0;_this.smac = "";_this.dip = "";
        _this.dport = "";_this.dmac = "";_this.protocol = "";_this.app = "";_this.tcpFlag = "";
        _this.inBytes = 0;_this.outBytes = 0;_this.inPkts = 0;_this.outPkts = 0;
        _this.startTime = "";_this.endTime = "";
        // _this.capDate = "2017-01-01";
    }
    /**
     * WEB应用行为 WebAction vo模型
     * 序号 id、_this.id = "";  源ip地址 sip 、源端口号 sport、源MAC地址 smac、目的ip dip、
     * 目的端口 dport 、目的mac dmac、传输层协议 protocol、应用协议 app、
     * 访问域 domain、访问URL url、请求方法 method、返回码 ret_code、
     * 请求User-Agent user-agent 、请求的cookie信息 cookie、服务端的server信息、server、
     * 引用页 refer、事件产生时间 time、事件产生日期 cap_date
     * **/
    function WebAction(){
        var _this = this;
        _this.deviceId = "";
        _this.sip = "";_this.sport = 0;_this.smac = "";_this.dip = "";
        _this.dport = "";_this.dmac = "";_this.protocol = "";_this.app = "";
        _this.domain = "";_this.url = "";_this.method = "";_this.returnCode = 0;
        _this.userAgent = "";_this.cookie = "";_this.server = "";_this.refer = "";
        _this.produceTime = "";
        // _this.capDate = "";
    }
    /**
     * SSL访问行为 SSLAction Vo模型
     * 序号 id、_this.id = "";  源ip地址 sip 、源端口号 sport、源MAC地址 smac、目的ip dip、
     * 目的端口 dport 、目的mac dmac、传输层协议 protocol、应用协议 app、
     * 服务器证书指纹SHA1 finger、服务器颁发者国家信息 country、
     * 服务器证书颁发者组织信息 organize、服务器证书颁发者通用名信息 cname、
     * 服务器证书颁发者域名信息 sni、服务器证书使用者组织信息 uorganize、
     * 服务器证书使用者通用名信息 ucname、事件产生时间 time、事件产生日期 cap_date
     * **/
    function SSLAction(){
        var _this = this;
        _this.deviceId = "";
        _this.sip = "";_this.sport = 0;_this.smac = "";_this.dip = "";
        _this.dport = "";_this.dmac = "";_this.protocol = "";_this.app = "";
        _this.finger = "";_this.country = "";_this.organize = "";_this.cname = "";
        _this.sni = "";_this.uorganize = "";_this.ucname = "";_this.produceTime = "";
        // _this.capDate = "";
    }
    /**
     * 电子邮件行为审计 EmailAction vo模型
     * 序号 id、_this.id = "";  源ip地址 sip 、源端口号 sport、源MAC地址 smac、目的ip dip、
     * 目的端口 dport 、目的mac dmac、传输层协议 protocol、应用协议 app、
     * 发送方 sender、接收方 recver、抄送 cc、密送bcc、主题 subject、
     * 附件名列表 attachment、webmail邮件提供商名 domain、
     * 认证过程中MAIL FROM命令提交的邮件发送者 mail_from、
     * 认证过程中RCPT TO提交的邮件接受者 rcpt_to、
     * 认证过程中EHLO命令提交的IP信息 ehlo、事件产生时间 time、
     * 事件产生日期 cap_date
     * **/
    function EmailAction(){
        var _this = this;
        _this.deviceId = "";
        _this.sip = "";_this.sport = 0;_this.smac = "";_this.dip = "";
        _this.dport = "";_this.dmac = "";_this.protocol = "";_this.app = "";
        _this.sender = "";_this.receiver = [];_this.copyTo = [];_this.secritCopyTo=[];
        _this.subject = "";_this.attachment = [];_this.domain = "";_this.mailFrom = "";
        _this.rcptTo = [];_this.ehlo = "";_this.produceTime = "";
        // _this.capDate = "";
    }
    /**
     * 序号 id、_this.id = ""; 源ip地址 sip 、源端口号 sport、源MAC地址 smac、目的ip dip、
     * 目的端口 dport 、目的mac dmac、传输层协议 protocol、应用协议 app、
     * 传输文件名 filename 、传输文件大小 filesize、事件产生时间time、时间产生日期 cap_date
     * **/
    function FtpAction(){
        var _this = this;
        _this.deviceId = "";
        _this.sip = "";_this.sport = 0;_this.smac = "";_this.dip = "";
        _this.dport = "";_this.dmac = "";_this.protocol = "";_this.app = "";
        _this.fileName = "";_this.fileSize = "";_this.produceTime = "";
        // _this.capDate = "";
    }
    /**
     * DNS域名请求行为 DnsAction vo模型
     * 序号 id、_this.id = "";  源ip地址 sip 、源端口号 sport、源MAC地址 smac、目的ip dip、
     * 目的端口 dport 、目的mac dmac、传输层协议 protocol、应用协议 app、
     * 请求域名 request、域名请求返回的IP列表 reponse、事件产生时间time、时间产生日期 cap_date
     * **/
    function DnsAction() {
        var _this = this;
        _this.deviceId = "";
        _this.sip = "";_this.sport = 0;_this.smac = "";_this.dip = "";
        _this.dport = "";_this.dmac = "";_this.protocol = "";_this.app = "";
        _this.request = "";_this.reponse = [];_this.produceTime = "";
        // _this.capDate = "";
    }
    /**
     * 扩展应用系统 vo 模型
     *_this.id = "";
     * **/
    function ExpandSystem(){
        var _this = this;
        _this.alias = "";_this.name = "";_this.note = "";
        _this.createdTime = "";_this.creator = "";_this.deleted = false;
        _this.deletedTime = "";_this.externalId = "";_this.keywords = "";
        _this.lastModifiedTime = "";_this.lastModifier = "";_this.locked = false;
        _this.ordinal = 0;_this.orginal = "";_this.phone = "";_this.uri = "";
        _this.resourceSpace = "";_this.resourceType = "";_this.url = "";
    }

    /**
     *  告警处置分类 表格的表头vo模型
     * **/
    var publicHead = {
        "name":"公共的属性",
        "type":"public",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"检测器ID",
            "rule_id":"产生告警的规则ID",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "time":"告警产生时间",
            "risk":"告警级别",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"处置状态",
            "res_type":"告警类型"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //木马攻击
    var trojanAttack = {
        name: "木马攻击窃密告警",
        type: "trojanAttack",
        property: {
            id: "ID",
            alert_id: "告警ID",
            device_id: "设备编号",
            rule_id: "产生告警的规则ID",
            sip: "源IP地址",
            sport: "源端口号",
            smac: "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "time": "告警产生时间",
            "risk": "告警级别",
            "trojan_id": "木马分类编号",
            "prevalence": "攻击流行程度",
            "attack_range": "攻击适用范围",
            "application": "攻击适用的应用程序",
            "os": "攻击适用的操作系统",
            "trojan_name": "木马名称",
            "trojan_type": "木马类型",
            "descr": "攻击窃密告警描述",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态",
            "alert_type": "告警类型"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    //漏洞利用窃密攻击
    var exploitAttack = {
        "name": "漏洞利用窃密攻击告警",
        "type": "exploitAttack",
        "property": {
            "id": "ID",
            "alert_id": "告警ID",
            "device_id": "设备编号",
            "rule_id": "产生告警的规则ID",
            "sip": "源IP地址",
            "sport": "源端口号",
            "smac": "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "time": "告警产生时间",
            "risk": "告警级别",
            "attack_type": "攻击类型",
            "application": "攻击适用的应用程序",
            "os": "攻击适用的操作系统",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    //恶意程序窃密攻击告警
    var malwareAttack = {
        "name": "恶意程序窃密攻击告警",
        "type": "malwareAttack",
        "property": {
            "id": "ID",
            "alert_id": "告警ID",
            "device_id": "设备编号",
            "rule_id": "产生告警的规则ID",
            "sip": "源IP地址",
            "sport": "源端口号",
            "smac": "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "time": "告警产生时间",
            "risk": "告警级别",
            "malware_type": "恶意程序种类",
            "malware_name": "恶意程序名称",
            "protocol": "传输该恶意程序的应用协议",
            "sender": "发送者",
            "recver": "接收者",
            "cc": "邮件抄送者",
            "bcc": "邮件密送者",
            "subject": "邮件主题",
            "mail_from": "认证提交的邮件发送者",
            "rcpt_to": "认证提交的邮件接收者",
            "ehlo": "认证提交的IP信息",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    //其他攻击窃密告警
    var otherAttack = {
        "name": "其他攻击窃密告警",
        "type": "otherAttack",
        "property": {
            "id": "ID",
            "alert_id": "告警ID",
            "device_id": "设备编号",
            "rule_id": "产生告警的规则ID",
            "sip": "源IP地址",
            "sport": "源端口号",
            "smac": "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "time": "告警产生时间",
            "risk": "告警级别",
            "descr": "攻击窃密告警描述",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    //未知攻击窃密告警
    var abnormalAttack = {
        "name": "未知攻击窃密告警",
        "type": "abnormalAttack",
        "property": {
            "id": "ID",
            "alert_id": "告警ID",
            "device_id": "设备编号",
            "sip": "源IP地址",
            "sport": "源端口号",
            "smac": "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "alert_type": "未知攻击窃密类型",
            "alert_ policy": "未知攻击窃密判断依据",
            "alert_desc": "未知攻击窃密判断描述",
            "time": "告警产生时间",
            "risk": "告警级别",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    //帐号审计
    var accout = {
        "name": "帐号审计",
        "type": "accout",
        "property": {
            "id": "ID",
            "alert_id": "告警ID",
            "device_id": "设备编号",
            "rule_id": "产生告警的规则ID",
            "sip": "源IP地址",
            "sport": "源端口号",
            "smac": "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "risk": "告警级别",
            "sender": "发送人帐号",
            "receiver": "接收人帐号列表",
            "cc": "抄送人帐号列表",
            "bcc": "密抄人帐号列表",
            "subject": "邮件主题",
            "mail_conent": "邮件内容",
            "attachment_names": "附件名称列表",
            "time": "告警产生时间",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    //域名审计告警
    var domain = {
        "name":"域名审计告警",
        "type":"domain",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "rule_id":"产生告警的规则ID",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "risk":"告警级别",
            "dns":"域名",
            "domain_ip":"域名对应的IP列表",
            "time":"告警产生时间",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //IP审计告警
    var ip = {
        "name":"IP审计告警",
        "type":"ip",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "rule_id":"产生告警的规则ID",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "risk":"告警级别",
            "time":"告警产生时间",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //URL审计告警
    var url = {
        "name":"URL审计告警",
        "type":"url",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "rule_id":"产生告警的规则ID",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "risk":"告警级别",
            "url":"请求URL",
            "method":"请求方法",
            "user-agent":"请求User Agent信息",
            "cookie":"请求Cookie信息",
            "ret_code":"返回状态码",
            "server":"服务器信息",
            "refer":"引用页",
            "time":"告警产生时间",
            // "cap_date":"告警生成日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //电子邮件涉密信息告警
    var email = {
        "name":"电子邮件涉密信息告警",
        "type":"email",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "alert_type":"告警类型",
            "rule_id":"产生告警的规则ID",
            "risk":"告警级别",
            "time":"告警产生时间",
            "sm_inpath":"实际告警文件内嵌路径",
            "sm_summary":"SM数据摘要",
            "sm_desc":"SM数据描述",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "xm_dir":"数据传输方向",
            "sender":"发件人邮箱",
            "receiver":"收件人邮箱",
            "cc":"抄送",
            "bcc":"密送",
            "subject":"邮件主题",
            "domain":"邮件提供商名",
            "protocol":"最上层协议类型",
            "mail_from":"认证提交的邮件发送者",
            "rcpt_to":"认证提交的邮件接收者",
            "ip":"认证提交的IP信息",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //文件传输涉密信息告警
    var fileTranfer = {
        "name":"文件传输涉密信息告警",
        "type":"fileTranfer",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "alert_type":"告警类型",
            "rule_id":"产生告警的规则ID",
            "risk":"告警级别",
            "time":"告警产生时间",
            "sm_inpath":"实际告警文件内嵌路径",
            "sm_summary":"SM数据摘要",
            "sm_desc":"SM数据描述",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "xm_dir":"数据传输方向",
            "protocol":"消息的协议类型",
            "account":"FTP账号",
            "pwd":"FTP密码",
            "trans_dir":"文件传输方向",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //HTTP发布涉密信息告警
    var http = {
        "name":"HTTP发布涉密信息告警",
        "type":"http",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "alert_type":"告警类型",
            "rule_id":"产生告警的规则ID",
            "risk":"告警级别",
            "time":"告警产生时间",
            "sm_inpath":"实际告警文件内嵌路径",
            "sm_summary":"SM数据摘要",
            "sm_desc":"SM数据描述",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "xm_dir":"数据传输方向",
            "protocol":"消息的协议类型",
            "domain":"访问域",
            "url":"访问url",
            "method":"HTTP请求方法",
            "ret_code":"HTTP返回码",
            "user-agent":"请求user-agent",
            "cookie":"请求的cookie信息",
            "server":"服务端的server信息",
            "refer":"引用页",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //即时通信涉密信息告警
    var im = {
        "name":"即时通信涉密信息告警",
        "type":"im",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "alert_type":"告警类型",
            "rule_id":"产生告警的规则ID",
            "risk":"告警级别",
            "time":"告警产生时间",
            "sm_inpath":"实际告警文件内嵌路径",
            "sm_summary":"SM数据摘要",
            "sm_desc":"SM数据描述",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "xm_dir":"数据传输方向",
            "protocol":"消息的协议类型",
            "sender":"发件人",
            "receiver":"收件人",
            "account":"IM帐号",
            "msg_content":"聊天内容",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //网盘涉密信息告警
    var netdisk = {
        "name":"网盘涉密信息告警",
        "type":"netdisk",
        "property":{
            "id":"ID",
            "alert_id":"告警ID",
            "device_id":"设备编号",
            "alert_type":"告警类型",
            "rule_id":"产生告警的规则ID",
            "risk":"告警级别",
            "time":"告警产生时间",
            "sm_inpath":"实际告警文件内嵌路径",
            "sm_summary":"SM数据摘要",
            "sm_desc":"SM数据描述",
            "sip":"源IP地址",
            "sport":"源端口号",
            "smac":"源MAC地址",
            "dip":"目的IP地址",
            "dport":"目的端口号",
            "dmac":"目的MAC地址",
            "xm_dir":"数据传输方向",
            "protocol":"消息的协议类型",
            "account":"网盘账户",
            "domain":"网盘类型",
            // "cap_date":"告警采集日期",
            "organs":"检测器名称",
            "disposalStatus":"审核状态"//,
            // "start_time":"开始时间",
            // "end_time":"结束时间"
        }
    };
    //其他涉密信息告警
    var otherSecurity = {
        "name":"其他涉密信息告警",
        "type":"otherSecurity",
        "property": {
            "id": "ID",
            "alert_id": "告警ID",
            "device_id": "设备编号",
            "alert_type": "告警类型",
            "rule_id": "产生告警的规则ID",
            "risk": "告警级别",
            "time": "告警产生时间",
            "sm_inpath": "实际告警文件内嵌路径",
            "sm_summary": "SM数据摘要",
            "sm_desc": "SM数据描述",
            "sip": "源IP地址",
            "sport": "源端口号",
            "smac": "源MAC地址",
            "dip": "目的IP地址",
            "dport": "目的端口号",
            "dmac": "目的MAC地址",
            "xm_dir": "数据传输方向",
            // "cap_date": "告警采集日期",
            "organs": "检测器名称",
            "disposalStatus": "审核状态"//,
            // "start_time": "开始时间",
            // "end_time": "结束时间"
        }
    };
    function AlertTableHead() {
        var _this = this;
        _this.publicHead = publicHead;
        _this.trojanAttack = trojanAttack;
        _this.exploitAttack = exploitAttack;
        _this.malwareAttack = malwareAttack;
        _this.otherAttack = otherAttack;
        _this.abnormalAttack = abnormalAttack;
        _this.accout = accout;
        _this.domain = domain;
        _this.ip = ip;
        _this.url = url;
        _this.email = email;
        _this.fileTranfer = fileTranfer;
        _this.http = http;
        _this.im = im;
        _this.netdisk = netdisk;
        _this.otherSecurity = otherSecurity;

        // return _this;
        //-----------------------
    }
    
    /**
     * 绑定到vo模型
     * **/
    utils.vo.userVo = function () {
        return new User();
    };
    utils.vo.roleVo = function () {
        return new Role();
    };
    utils.vo.roleShowVo = function () {
        return new RoleShow();    
    };
    utils.vo.authorityVo = function(){
        return new Authority();
    };
    utils.vo.authorityShowVo = function(){
        return new AuthorityShow();
    };
    utils.vo.policyVo = function(){
        return new Policy();
    };
    utils.vo.deviceVo = function(){
        return new Device();
    };
    utils.vo.netConnAuditVo = function(){
        return new NetConnAudit();
    };
    utils.vo.webActionVo = function(){
        return new WebAction();
    };
    utils.vo.sslActionVo = function () {
        return new SSLAction();
    };
    utils.vo.emailActionVo = function () {
        return new EmailAction();
    };
    utils.vo.ftpActionVo = function(){
        return new FtpAction();
    };
    utils.vo.dnsActionVo = function(){
        return new DnsAction();
    };
    utils.vo.expandSystemVo = function(){
        return new ExpandSystem();
    };

    utils.vo.alertHeadVo = function(){
        return new AlertTableHead();
    }
})();