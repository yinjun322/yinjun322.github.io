//mark
//左上：-18 上:-17 右上:-16 右:1 右下:18 下:17 左下:16 左:-1
var ss_direction_list = [-18,-17,-16,1,18,17,16,-1];
var ss_angle_list = [-135,-90,-45,0,45,90,135,-180];
var MoveMarkView = cc.Node.extend({
    ctor:function(){
        this._super();
        var spr = cc.Sprite.create("orgImages/chess/arrow2.png");//cc.Sprite.createWithSpriteFrameName(cc.spriteFrameCache.getSpriteFrame("orgImages/chess/arrow2.png"));
        this.addChild(spr);
    },
    setPos:function(col,row){
        this.x = s_begin_x + row*s_width;
        this.y = s_begin_y + (16-col)*s_width;
    },
    setMove:function(from,to){
        this.setPos(Math.floor(from/17),from%17);
        var direction = 0;
        for(i in ss_direction_list){
            if(ss_direction_list[i] == (to-from) || ss_direction_list[i]*2 == (to-from)){
                direction = i;
            }
        }

        //cc.log("setMove from",from," to",to,"  angle",ss_angle_list[direction]);
        this.setRotation(ss_angle_list[direction]);
    }
});
