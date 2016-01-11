//chess

var ChessView = cc.Node.extend({
    ctor:function(realcid){
        this._super();
        this.m_realcid = realcid;
        this.m_cid = realcid%100;
        this.m_seatid = (realcid-this.m_cid)/100;
        this.initChess();
        this.m_col = 0;
        this.m_row = 0;
		cc.log("realcid " + realcid);
    },
    setPos:function(col,row){
        this.m_col = col;
        this.m_row = row;
        var pos = this.calculatePos(col,row);
        this.x = pos.x;
        this.y = pos.y;
        //这里设置旋转
        var nDirection = 1;
        if(col<6){

        }
        if(s_myPos != 2){
            this.setRotation(90*(s_myPos+4-2));
        }
    },
    getPos:function(){
        return {col:this.m_col,row:this.m_row};
    },
    setMove:function(col,row,movelist,callback){
        this.m_col = col;
        this.m_row = row;
        //this.setPos(col,row);
        var arr = new Array();
        for(i=0;i<movelist.length;i+=1){
            var posid = movelist[i].from;
            var pos = this.calculatePosWithPosId(posid);
            arr.push(cc.moveTo(0.1,cc.p(pos.x, pos.y)));
        }
        var pos = this.calculatePos(col,row);
        arr.push(cc.moveTo(0.1,cc.p(pos.x,pos.y)));
        var callback2 = function(){
            this.m_cacheCallBack = null;
            callback();
        };
        this.m_cacheCallBack = callback;
        arr.push(cc.callFunc(callback2));
        var act = cc.sequence(arr);
        this.runAction(act);
    },
    stopMove:function(){
        this.stopAllActions();
        if(this.m_cacheCallBack){
            this.m_cacheCallBack()
            this.m_cacheCallBack = null;
        }
        this.setPos(this.m_col,this.m_row);
    },
    calculatePosWithPosId:function(posid){
        var col = Math.floor(posid/17);
        var row = posid%17;
        return this.calculatePos(col,row);
    },
    calculatePos:function(col,row){
        var x = s_begin_x + row*s_width;
        var y = s_begin_y + (16-col)*s_width;
        return {x:x,y:y};
    },
    getCid:function(){
        return this.m_cid;
    },
    getRealCid:function(){
        return this.m_realcid;
    },
    getSeatId:function(){
        return this.m_seatid;
    },
    initChess:function(){
        var color_res = "orgImages/chess/";
        switch(this.m_seatid)
        {
            case 1:
            color_res += "green_";
            break;
            case 2:
            color_res += "red_";
            break;
            case 3:
            color_res += "yellow_";
            break;
            case 4:
            color_res += "blue_";
            break;
            default:
            cc.log("this is error,seatid is nil");
        }
        if(this.m_cid == 100){
            color_res += "100";
        }
        color_res += ".png";


        chess_res = "orgImages/chess/cid_";
        if(this.m_cid == 100)
        {
            chess_res += "1";
        }else{
            chess_res += this.m_cid;
        }
        chess_res += ".png"
		cc.log("chess_res" + chess_res);

        if(this.m_spr && this.m_chessImg){
            self.spr.setTexture(cc.spriteFrameCache.getSpriteFrame(color_res));
            this.m_chessImg.setTexture(cc.spriteFrameCache.getSpriteFrame(chess_res));
            if(this.m_cid == 100){
                this.m_chessImg.setVisible(false);
            }
            return;
        }
        //this.m_spr = new ccui.ImageView(color_res,ccui.Widget.PLIST_TEXTURE);
        this.m_spr = cc.Sprite.create(color_res);//cc.Sprite.createWithSpriteFrameName(cc.spriteFrameCache.getSpriteFrame(color_res));

        //this.m_chessImg = new ccui.ImageView(chess_res,ccui.Widget.PLIST_TEXTURE);

        this.m_chessImg = cc.Sprite.create(chess_res);//cc.Sprite.createWithSpriteFrameName(cc.spriteFrameCache.getSpriteFrame(chess_res));
        this.addChild(this.m_spr);
        this.addChild(this.m_chessImg);
        if(this.m_cid == 100){
            this.m_chessImg.setVisible(false);
        }
    }
});
