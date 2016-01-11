//board

//几个全局变量
s_begin_x = 76-413;
s_begin_y = 102-438;
s_width = 42;

s_row_max = 16;
s_col_max = 16;

//所有的铁道是1
//大本营是2
//营地是3
//边角位步兵线是4


var s_board_list = [
    0,0,0,0,0,0,    4,2,4,2,4,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,1,1,1,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,3,4,3,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,4,3,4,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,3,4,3,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,1,1,1,1,    0,0,0,0,0,0,

    4,1,1,1,1,1,    1,0,1,0,1,    1,1,1,1,1,4,
    2,1,3,4,3,1,    0,0,0,0,0,    1,3,4,3,1,2,
    4,1,4,3,4,1,    1,0,1,0,1,    1,4,3,4,1,4,
    2,1,3,4,3,1,    0,0,0,0,0,    1,3,4,3,1,2,
    4,1,1,1,1,1,    1,0,1,0,1,    1,1,1,1,1,4,

    0,0,0,0,0,0,    1,1,1,1,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,3,4,3,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,4,3,4,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,3,4,3,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,1,1,1,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    4,2,4,2,4,    0,0,0,0,0,0
];

//1:铁路线 2:可以越过的点
//在中间的正方形的角上面再多加个辅助点,使得寻路时，只需要做上下左右的判断
var s_board_railway_list = [
    0,0,0,0,0,0,    0,0,0,0,0,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,1,1,1,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,0,0,0,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,0,0,0,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,0,0,0,1,    0,0,0,0,0,0,
    0,0,0,0,0,1,    1,1,1,1,1,    1,0,0,0,0,0,

    0,1,1,1,1,1,    1,2,1,2,1,    1,1,1,1,1,0,
    0,1,0,0,0,1,    2,0,2,0,2,    1,0,0,0,1,0,
    0,1,0,0,0,1,    1,2,1,2,1,    1,0,0,0,1,0,
    0,1,0,0,0,1,    2,0,2,0,2,    1,0,0,0,1,0,
    0,1,1,1,1,1,    1,2,1,2,1,    1,1,1,1,1,0,

    0,0,0,0,0,1,    1,1,1,1,1,    1,0,0,0,0,0,
    0,0,0,0,0,0,    1,0,0,0,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,0,0,0,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,0,0,0,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    1,1,1,1,1,    0,0,0,0,0,0,
    0,0,0,0,0,0,    0,0,0,0,0,    0,0,0,0,0,0
];

var GameLog = "3:2007495,0,2005582,0,\n4:0,0,0,0,0,0,1,34,1,41,1,0,0,0,0,0,0,0,0,0,0,0,0,36,34,33,39,37,0,0,0,0,0,0,0,0,0,0,0,0,32,0,35,0,40,0,0,0,0,0,0,0,0,0,0,0,0,38,33,0,2,38,0,0,0,0,0,0,0,0,0,0,0,0,2,0,32,0,37,0,0,0,0,0,0,0,0,0,0,0,0,32,35,33,34,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,35,37,34,38,37,0,0,0,0,0,0,0,0,0,0,0,0,36,0,36,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,33,0,35,32,0,0,0,0,0,0,0,0,0,0,0,0,34,0,32,0,33,0,0,0,0,0,0,0,0,0,0,0,0,33,32,1,40,39,0,0,0,0,0,0,0,0,0,0,0,0,1,34,38,41,1,0,0,0,0,0,0,\n10:91,124,\n10:197,180,\n10:95,117,\n10:214,184,\n10:74,142,\n6:1\n2:"


var testLog = "0,0,0,0,0,0,1,33,37,41,1,0,0,0,0,0,0,0,0,0,0,0,0,34,36,38,37,1,0,0,0,0,0,0,0,0,0,0,0,0,32,0,33,0,39,0,0,0,0,0,0,0,0,0,0,0,0,36,32,0,2,35,0,0,0,0,0,0,0,0,0,0,0,0,34,0,34,0,2,0,0,0,0,0,0,0,0,0,0,0,0,40,32,33,35,38,0,0,0,0,0,0,1,40,35,32,33,33,0,0,0,0,0,34,38,34,40,34,1,1,36,0,36,0,34,0,0,0,0,0,33,0,35,0,1,41,1,38,32,0,32,35,0,0,0,0,0,36,33,0,32,39,36,41,37,0,2,0,33,0,0,0,0,0,32,0,38,0,32,1,2,38,37,39,34,34,0,0,0,0,0,37,2,35,33,2,37,0,0,0,0,0,0,38,37,34,32,38,0,0,0,0,0,0,0,0,0,0,0,0,2,0,33,0,36,0,0,0,0,0,0,0,0,0,0,0,0,39,34,0,35,40,0,0,0,0,0,0,0,0,0,0,0,0,34,0,32,0,37,0,0,0,0,0,0,0,0,0,0,0,0,1,36,32,35,2,0,0,0,0,0,0,0,0,0,0,0,0,1,41,1,33,33,0,0,0,0,0,0"

var testLog2 = "0,0,0,0,0,0,34,34,1,41,1,0,0,0,0,0,0,0,0,0,0,0,0,38,33,1,34,35,0,0,0,0,0,0,0,0,0,0,0,0,35,0,32,0,37,0,0,0,0,0,0,0,0,0,0,0,0,37,36,0,36,39,0,0,0,0,0,0,0,0,0,0,0,0,2,0,32,0,2,0,0,0,0,0,0,0,0,0,0,0,0,38,33,32,33,40,0,0,0,0,0,0,1,37,35,36,38,40,0,0,0,0,0,34,39,38,2,36,35,41,32,0,34,0,34,0,0,0,0,0,34,0,34,0,32,33,1,32,33,0,2,38,0,0,0,0,0,33,32,0,32,36,1,33,33,0,2,0,32,0,0,0,0,0,40,0,33,0,37,41,34,1,35,36,37,39,0,0,0,0,0,38,2,37,35,1,1,0,0,0,0,0,0,38,34,37,32,40,0,0,0,0,0,0,0,0,0,0,0,0,37,0,35,0,33,0,0,0,0,0,0,0,0,0,0,0,0,35,2,0,32,39,0,0,0,0,0,0,0,0,0,0,0,0,33,0,33,0,34,0,0,0,0,0,0,0,0,0,0,0,0,1,36,38,2,36,0,0,0,0,0,0,0,0,0,0,0,0,1,41,1,34,32,0,0,0,0,0,0";
//上:-17 下:17 左:-1 右:1
var s_direction_list = [-17,1,17,-1];

function ChessPosition(col,row)
{
    this.col = col;
    this.row = row;
    this.id = col*17+row;
    this.lastPos = 0;
}

function handleLog(log){
    var strlist = log.split("\n");
    cc.log("yinjun laile");
    for(i in strlist){
        cc.log("" + strlist[i]);
    }

    return strlist
}

var BoardLayer = cc.Node.extend({
    ctor:function(){
        this._super();
        this.m_myPos = 0;


        return true;
    },
    initUserInfo:function(userStr){
        var posList = [280,556,545,556,545,306,280,306];
        var offsetList = [-130,100,130,100,130,-100,-130,-100];
        var rList = [90,180,270];
        var rPosList = [210,63,96,-5,-10,63,96,133];
        var myPos = Number(userStr.substring(0,1));
        this.m_myPos = myPos;
        s_myPos = myPos;
        var node = cc.Node.create();
        this.addChild(node);
        if(s_myPos != 2){
            node.setRotation(90*(s_myPos+3-2));
        }


        if(this.m_myPos != 2){
            this.setRotation(-90*(myPos+3-2));
        }
        userStr = userStr.substring(4);
        cc.log("userStr = " + userStr);
        var userInfoList = userStr.split(",");

        //缓存玩家姓名
        this.m_cacheNameList = new Array();
        for(i=0;i<4;i+=1){
            var oneInfoList = userInfoList[i].split("|");
            var nameStr = oneInfoList[1];
            this.m_cacheNameList[i] = nameStr;
        }
        cc.log("userNameList" + this.m_cacheNameList);
		if(!userStr){
			return;
		}
        for(i=0;i<4;i+=1){
            var localPos = (2 - (myPos-1) - i + 8)%4;
            var spr = cc.Sprite.create("orgImages/icon_bg.png");
            spr.x = posList[2*i] + offsetList[2*i] - 413;
            spr.y = posList[2*i+1] + offsetList[2*i+1] - 438;
            node.addChild(spr);
            var up_img = cc.Sprite.create("orgImages/up.png");
            up_img.setRotation(rList[i]);
            up_img.x = rPosList[i*2];
            up_img.y = rPosList[i*2+1];
            spr.addChild(up_img);
            var icon_bg = cc.Sprite.create("orgImages/male_head.png");
            spr.addChild(icon_bg);
            icon_bg.x = 60;
            icon_bg.y = 67;

            var oneInfoList = userInfoList[localPos].split("|");
            var nameStr = oneInfoList[1];
            if(nameStr.length > 4){
                nameStr = nameStr.substring(0,3) + "..";
            }
            var name = cc.LabelTTF.create(nameStr, "Arial",20);
            name.x = 150;
            name.y = 87;
            spr.addChild(name);

            var level_icon = cc.Sprite.create("orgImages/xiaobing.png");
            spr.addChild(level_icon);
            level_icon.x = 120;
            level_icon.y = 40;

            var level_name = cc.LabelTTF.create(oneInfoList[3], "Arial",18);
            spr.addChild(level_name);
            level_name.x = 140;
            level_name.y = 40;
            level_name.setAnchorPoint(0,0.5);
        }
    },
    initChessBoard:function(chesslog){
        cc.log("initChessBoard ",chesslog);
        GameLog = chesslog ;
        this.m_gamelog = handleLog(GameLog);
        this.m_moveHisLog = new Array();

        this.m_moveHintSprList = new Array();
        this.m_moveHintSprListIndex = 0;

        this.m_index = 3; 

        this.initUserInfo(this.m_gamelog[1]);

        var chesslayout = this.m_gamelog[2];
        chesslayout = chesslayout.substring(2);
        //chesslayout = testLog2;
        var chesslayout = chesslayout.split(",");
        cc.log("gamelog = " + chesslayout);

        this.m_chessList = new Array();
        for(i=0;i<chesslayout.length;i++){
            if(chesslayout[i] && chesslayout[i] != "0" && Number(chesslayout[i] != 0)){
                var col = Math.floor(i/17);
                var row = i%17;
                //在这里根据棋子的位置判断棋子的server seatid
                var seatid = 1;
                if(col < 6){
                    seatid = 1;
                }else if(col >=6 && col < 11){
                    if(row < 6 ){
                        seatid = 4;
                    }else{
                        seatid = 2;
                    }
                }else{
                    seatid = 3;
                }
                var realCid = seatid*100 + Number(chesslayout[i]);
                var chess = new ChessView(realCid);
                var posid = i
                chess.setPos(col,row);
                this.addChild(chess,10);
                this.m_chessList[i] = chess;
            }
        }




//        var chess = new ChessView(33);
//        chess.setPos(6,0);
//        this.addChild(chess);
//        this.m_chessList[6*17+0] = chess;
//
//        var endchess = new ChessView(33);
//        endchess.setPos(15,10);
//        this.addChild(endchess);
//        this.m_chessList[15*17+10];

//        var shortList = this.findShortRoad(6*17+0,15*17+10);
//
//        for(i=0;i<shortList.length;i++){
//            var posid = shortList[i];
//
//        }

    },
    findShortRoad:function(start,end){
        var m_newList = new Array();
        var m_findList = new Array();
        //用起点初始化
        m_newList.push({posId:start,count:0,lastPos:0});
        var myobject = this;
        var findNewPos = function(item){
            var posid = item.posId;
            if(m_findList[posid]) {
                return false;
            }
            m_findList[posid] = true;
            //找出周围的四个位置
            //判断这四个位置是否在棋盘的铁路线上面
            //判断四个位置是否已经找过了
            //如果没找过就放到 m_newList 数组里面去
            for(i=0;i<s_direction_list.length;i++) {
                var nextPosId = posid + s_direction_list[i];
                if(nextPosId < 0 || nextPosId >= s_board_railway_list.length){
                    continue;
                }
                if(s_board_railway_list[nextPosId] == 2){
                    nextPosId = nextPosId + s_direction_list[i];
                }
                if(s_board_railway_list [nextPosId] == 1 && (!myobject.m_chessList[nextPosId] || nextPosId == end)){
                    if(!m_findList[nextPosId]){
                        var nextitem = {posId:nextPosId,count:item.count+1,lastPos:item.posId,item:item};
                        m_newList.push(nextitem);
                        if(nextPosId == end){
                            return true;
                        }
                    }
                }
            }
            return false;
            //如果已经找过了,就比较两个谁离起点近,若果发现更近的就更新自己的距离，以及自己的上个位置
        };
        var start_index=0;
        while(start_index < m_newList.length)
        {
            var item = m_newList[start_index];
            if(findNewPos(item)){
                //这个时候应该是已经找到结束位置了
                var roadList = new Array();
                var endOne = m_newList[m_newList.length-1];
                roadList.push(endOne.posId);
                while(endOne.item){
                    //过滤四个辅助点
                    var posid = endOne.item.posId;
                    if(posid != 5*17+5 && posid != 5*17+11 && posid != 11*17+5 && 11*17+11){
                        roadList.push(endOne.item.posId);
                    }
                    endOne = endOne.item;
                }
                return roadList;
            }
            start_index = start_index + 1;
        }

    },
    handleCmd:function(cmdstr){
        //这个命令处理玩家的各种动作指令的解析，实际就是解析每一行
        if(!cmdstr){
            cc.log("cmdstr is null");
            return;
        }
        cc.log("cmd is " + cmdstr);
        var list = cmdstr.split(":");
        var cmd = Number(list[0]);
        list = list[1];
        var ret = {cmd:cmd};

        var nameStr,seatId;
        if(cmd != 10){
            seatId = Number(list);
            nameStr = this.m_cacheNameList[seatId-1];
        }
        switch(cmd){
        case 0:
            //无棋可走
            ret.list = this.clearBoardChessBySeatId(seatId);
            this.showToast(nameStr + ": 无棋可走 ");
            break;
        case 1:
            //军旗被抗
            ret.list = this.clearBoardChessBySeatId(seatId);
            this.showToast(nameStr + ": 军旗被扛 ");
            break;
        case 2:
            //游戏结束
            this.showToast(" 游戏结束 ",true);
            break;
        case 3:
            //游戏开始
            this.showToast(" 开始游戏 ");
            break;
        case 4:
            //游戏布局
            break;
        case 5:
            //有人离开
            ret.list = this.clearBoardChessBySeatId(seatId);
            this.showToast(nameStr + ": 离开了 ");
            break;
        case 6:
            //有人求和
            this.showToast(nameStr + ": 求和 ");
            break;
        case 7:
            //有人投降
            ret.list = this.clearBoardChessBySeatId(seatId);
            this.showToast(nameStr + ": 投降 ");
            break;
        case 8:
            //有人跳过
            this.showToast(nameStr + ": 跳过 ");
            break;
        case 9:
            //有人超时
            this.showToast(nameStr + ": 超时 ");
            break;
        case 10:
            //移动棋子
            list = list.split(",");
            var from = Number(list[0]);
            var to = Number(list[1]);
            var chess = this.m_chessList[to];
            var realcid;
            if(chess){
                realcid = chess.getRealCid();
            }
            var realcid_from = this.m_chessList[from].getRealCid();

            cc.log("from",from," to",to);
            var movelist = this.getMovePath(from,to);
            var nRet = this.chessMoveTo(from,to,movelist);
            this.showMoveHint(movelist);
            ret.from = from;
            ret.to = to;
            ret.eat = nRet;
            ret.cid_to = realcid;
            ret.cid_from = realcid_from;
            break;
        default:
            cc.log("this is a error");
        }
        return ret;
    },
    playOrPauseCall:function(){
        var ret = this.handleCmd(this.m_gamelog[this.m_index]);
        if(ret){
            this.m_index += 1;
            this.pushCmdHanldle(ret);
            return true;
        }
        return false;
    },
    nextCall:function(){
        cc.log("nextCall");
    },
    lastCall:function(){
        cc.log("lastCall");
        if(this.m_index == 3){
            return;
        }
        this.m_index -= 1;
        var lastCmd = this.m_moveHisLog.pop();
        if(lastCmd){
            var cmd = lastCmd.cmd;
            switch(cmd){
            case 0:
            case 1:
            case 5:
            case 7:
                var list = lastCmd.list;
                for(i in list){
                    var one = list[i];
                    var col = one.pos.col;
                    var row = one.pos.row;
                    var chess = new ChessView(one.realCid);
                    var posid = col*17+row;
                    chess.setPos(col,row);
                    this.addChild(chess,10);
                    this.m_chessList[posid] = chess;
                }
                break;
            case 10:
                var chess = this.m_chessList[lastCmd.to];
                var from = lastCmd.from;
                var to = lastCmd.to;
                var col = Math.floor(from/17);
                var row = from%17;

                //chess.setPos(col,row);
                if(lastCmd.eat == 0){
                    var chess = new ChessView(lastCmd.cid_to);
                    col = Math.floor(to/17);
                    row = to%17;
                    chess.setPos(col,row);
                    this.addChild(chess,10);
                    this.m_chessList[to] = chess;

                    chess = new ChessView(lastCmd.cid_from);
                    col = Math.floor(from/17);
                    row = from%17;
                    chess.setPos(col,row);
                    this.addChild(chess,10);
                    this.m_chessList[from] = chess;
                }else if(lastCmd.eat == -1){
                    var chess = new ChessView(lastCmd.cid_from);
                    col = Math.floor(from/17);
                    row = from%17;
                    chess.setPos(col,row);
                    this.addChild(chess,10);
                    this.m_chessList[from] = chess;
                }else if(lastCmd.eat == 1){
                    chess.setPos(col,row);
                    this.m_chessList[from] = chess;

                    chess = new ChessView(lastCmd.cid_to);
                    col = Math.floor(to/17);
                    row = to%17;
                    chess.setPos(col,row);
                    this.addChild(chess,10);
                    this.m_chessList[to] = chess;
                }else if(lastCmd.eat == 3){
                    this.m_chessList[from] = chess;
                    this.m_chessList[to] = null;
                    chess.setPos(col,row);
                }
                break;
            default:
                break;
            }
            this.showToast("");
            this.disShowMoveHint()
        }
    },
    pushCmdHanldle:function(cmd){
        this.m_moveHisLog.push(cmd);
    },
    showToast:function(str,bShow){
        if(!this.m_toastLabel){
            this.m_toastLabel = cc.LabelTTF.create("", "Arial",50);
            this.addChild(this.m_toastLabel,20);
            //this.m_toastLabel.x = 400;
            //this.m_toastLabel.y = 400;
            if(s_myPos != 2){
               this.m_toastLabel.setRotation(90*(s_myPos+4-2));
            }

        }
        this.m_toastLabel.setString(str);
        if(!bShow){
            var actIn = cc.FadeIn.create(0.5);
            var act = cc.FadeTo.create(1,0);
            this.m_toastLabel.runAction(cc.Sequence.create(actIn,act));
        }else{
            this.m_toastLabel.runAction(cc.FadeIn.create(0.5));
        }
    },
    clearBoardChessBySeatId:function(seatid){
        var list = new Array();
        for(i=0;i<18*18;i+=1){
            if(this.m_chessList[i]){
                var chess = this.m_chessList[i];
                if(chess.getSeatId() == seatid){
                    var one = {};
                    one.realCid = chess.getRealCid();
                    one.pos = chess.getPos();
                    list.push(one);
                    this.m_chessList[i] = null;
                    chess.removeFromParent(true);
                    cc.log("clearboard remove one chess " + i);
                }
            }
        }
        return list;
    },
    chessMoveTo:function(from,to,movelist){
        //先停止前面的走棋动作
        if(this.m_cacheMoveChess){
            this.m_cacheMoveChess.stopMove();
        }
        var chess_from = this.m_chessList[from];
        this.m_chessList[from] = null;
        var col = Math.floor(to/17);
        var row = to%17;
        var chess_to = this.m_chessList[to];

        var myobject = this;
        var cid_from = chess_from.getCid();
        var cid_to;
        //默认为3,表示移动
        var nRet = 3;
        if(chess_to){
            cid_to = chess_to.getCid();
            nRet = this.checkChessFight(cid_from,cid_to);
        }

        var callback = function(){
            this.m_cacheMoveChess = null;
            if(!chess_to){
                return;
            }

            if(nRet == 0){
                chess_to.removeFromParent(true);
                chess_from.removeFromParent(true);
                myobject.m_chessList[to] = null;
                return;
            }
            if(nRet == -1){
                myobject.m_chessList[to] = chess_to;
                chess_from.removeFromParent(true);
            }else{
                myobject.m_chessList[to] = chess_from;
                chess_to.removeFromParent(true);
            }
        };
        chess_from.setMove(col,row,movelist,callback);
        this.m_chessList[to] = chess_from;
        this.m_cacheMoveChess = chess_from;
        return nRet;
    },
    checkChessFight:function(cid_from,cid_to){
        //检查棋子碰撞的结果
        //0 同归于尽
        //-1 自己被炸死
        //1 对方被炸死
        if(cid_from == cid_to || cid_from == 2 || cid_to == 2){
            return 0;
        }
        if(cid_to == 41){
            return 1;
        }
        if(cid_to == 1){
            if(cid_from == 32){
                return 1;
            }else{
                return -1;
            }
        }
        if((cid_from - cid_to) > 0){
            return 1;
        }else{
            return -1;
        }
    },
    getMovePath:function(from,to){

        //找出移动路径
        var moveList = new Array();
        //首先根据两个位置的col,row值去判断
        var col_from = Math.floor(from/17);
        var row_from = from%17;
        var col_to = Math.floor(to/17);
        var row_to = to%17;
        //如果有一个位置没在铁路线上面
        if(s_board_railway_list[from] == 0 || s_board_railway_list[to] == 0){
            var move = {from:from,to:to};
            moveList.push(move);
            return moveList;
        }
        //如果都在铁路线上面
        //是不是小兵
        if(this.m_chessList[from].getCid() == 32){
            var list = this.findShortRoad(from,to);
            cc.log("findShortRoad",list);
            var start = from;
            for(i=list.length-1;i>0;i-=1){
                var move = {from:list[i],to:list[i-1]};
                from = list[i-1];
                moveList.push(move);
            }
            return moveList;
        }
        //不是小兵
        //找出直线两点的路径
        var findRoad = function(s,e){
            var offset = e - s;
            var direction = 0;
            for(i=0;i<4;i+=1){
                var index = (4-i)%4;
                if(s_direction_list[index]*offset > 0 && offset%s_direction_list[index] == 0){
                    direction = index;
                    break;
                }
            }
            var list = new Array();
            while(s != e){
                list.push(s);
                s += s_direction_list[index];
            }
            list.push(e);
            cc.log("findRoad list",list);
            return list;
        }
        //col相等,或者row相等
        if(col_from == col_to || row_from == row_to){
            var list = findRoad(from,to);
            for(i=0;i<list.length-1;i+=1){
                var move = {from:list[i],to:list[i+1]};
                moveList.push(move);
            }
            return moveList;
        }
        //col和row都不相等
        //寻找中介点
        var center_col = col_from;
        var center_row = row_to;
        var center_pos = center_col*17+center_row;
        if(s_board_railway_list[center_pos] == 0){
            center_col = col_to;
            center_row = row_from;
            center_pos = center_id = center_col*17+center_row;
        }

        //找出起点到中间点的路径
        var listAll;
        var list = findRoad(from,center_pos);
        list.pop();
        listAll = list;
        //找出中间点到终点的路径
        list = findRoad(center_pos,to);
        list.shift();
        listAll = listAll.concat(list);
        for(i=0;i<listAll.length-1;i+=1){
            var move = {from:listAll[i],to:listAll[i+1]};
            moveList.push(move);
        }
        return moveList;
    },
    chessMoveBack:function(){

    },
    getMoveHintList:function(start,end){
        var start_col = Math.floor(start/17);
        var start_row = start%17;
        var end_col = Math.floor(end/17);
        var end_row = end%17;
        var offset_col = end_col-start_col;
        var offset_row = end_row-start_row;
        if(offset_col>0){
            offset_col = 1;
        }else{
            offset_col = -1;
        }

        if(offset_row>0){
            offset_row = 1;
        }else{
            offset_row = -1;
        }
        var list = new Array();
        for(c = start_col;(c-offset_col) != end_col;c += offset_col){
            for(r = start_row;(r-offset_row) != end_row;r += offset_row){
                list.push({col:c,row:r});
            }
        }
        list.pop();
        return list;
    },
    showMoveHint:function(movelist){
        this.disShowMoveHint();

        for(item in movelist){
            var movemark;
            //过滤掉不可能走的点
            if(s_board_list[movelist[item].from] == 0){
                continue;
            }
            if(this.m_moveHintSprListIndex >= this.m_moveHintSprList.length){
                movemark = new MoveMarkView();
                this.addChild(movemark);
                this.m_moveHintSprList[this.m_moveHintSprListIndex] = movemark;
            }
            movemark = this.m_moveHintSprList[this.m_moveHintSprListIndex];
            movemark.setVisible(true);
            movemark.setMove(movelist[item].from,movelist[item].to);
            this.m_moveHintSprListIndex += 1;
        }
    },
    disShowMoveHint:function(){
        for(i=0;i<this.m_moveHintSprList.length;i+=1){
            this.m_moveHintSprList[i].setVisible(false);
        }
        this.m_moveHintSprListIndex = 0;
    }
});
