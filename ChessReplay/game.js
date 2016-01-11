//game main
window.onload = function() {
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["HelloWorld.png","chess.plist"], function () {

            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();
					
					//cc.view.enableRetina(true);
					cc.view.adjustViewPort(true);
					cc.view.setDesignResolutionSize(450, 800, cc.ResolutionPolicy.SHOW_ALL);
					cc.view.resizeWithBrowserSize(true);
					

                    cc.spriteFrameCache.addSpriteFrames("chess.plist");
                    var spr = cc.Sprite.create("chess.png"); //cc.Sprite.createWithSpriteFrameName(cc.spriteFrameCache.getSpriteFrame("orgImages/chess/arrow2.png"));
                    var bg = cc.Sprite.create("HelloWorld.png");
                    bg.x = 500;
                    bg.y = 500;
					spr.y = 300;
                    this.addChild(bg);
                    bg.addChild(spr);
                }
            });
            //cc.director.runScene(new MyScene());
			cc.director.runScene(new GameScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};

var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
		
		var fontStyle = document.createElement("style");
        fontStyle.type = "text/css";
        document.body.appendChild(fontStyle);
        fontStyle.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;"
                                + "-webkit-tap-highlight-color:rgba(0,0,0,0);}";

		//cc.view.enableRetina(true);
        cc.view.adjustViewPort(true);
        cc.view.setDesignResolutionSize(800, 1280, cc.ResolutionPolicy.SHOW_ALL);
		//cc.view.setRealPixelResolution(450, 800, cc.ResolutionPolicy.SHOW_ALL);
		
        cc.view.resizeWithBrowserSize(true);

        

        cc.spriteFrameCache.addSpriteFrames("chess.plist");

        //var bigBg = cc.LayerColor.create(cc.color(0, 0, 0, 255),450,800);
        //this.addChild(bigBg);



        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var board = cc.Sprite.create("orgImages/chess/board.png");
        //board.setScale(0.55);
        board.setAnchorPoint(cc.p(0.5,0.5));
        board.x = size.width/2;
        board.y = size.height/2;

        this.addChild(board) ;
        this.m_boardView= new BoardLayer();
        board.addChild(this.m_boardView);
        this.m_boardView.x = 413;
        this.m_boardView.y = 438;

        var myObj = this;

        var btnHolder = cc.Menu.create();
		
        btnHolder.x = size.width/2;
        btnHolder.y = size.height*6/7;
        this.addChild(btnHolder);

        var last_btn = cc.MenuItemImage.create("orgImages/last_step.png","orgImages/last_step_2.png",function(){
            myObj.m_boardView.lastCall();
            myObj.runAutoCmd(false);
            cc.log("this is last_btn");
        },this);
        btnHolder.addChild(last_btn);
        last_btn.x = -100;

        var play_btn = cc.MenuItemImage.create("orgImages/play_btn.png","orgImages/play_btn_2.png",function(){
            myObj.runAutoCmd(true)
            //this.m_boardView.playOrPauseCall();
            cc.log("this is play_btn");
        },this);
        btnHolder.addChild(play_btn);
		play_btn.setScale(2)


        var next_btn = cc.MenuItemImage.create("orgImages/next_step.png","orgImages/next_step_2.png",function(){
            myObj.m_boardView.playOrPauseCall();
            myObj.runAutoCmd(false);
            cc.log("http require");



        },this);
        btnHolder.addChild(next_btn);
        next_btn.x = 100;

        //发送请求
        var xhr = cc.loader.getXMLHttpRequest();
        //set arguments with <URL>?xxx=xxx&yyy=yyy
        xhr.open("GET", "http://192.168.200.21/dfqp/index.php?action=externals.getChessRecord&id=9999", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText;
                cc.log("http response is ",response);
				response = JSON.parse(response);
                myObj.m_boardView.initChessBoard(response.content);
            }
        };
        xhr.send();
		
		//var txt = cc.loader._loadTxtSync("chesslog.txt");
		//cc.log("txt response is ",txt);
        //this.m_boardView.initChessBoard(txt);




/*
        var last_btn = ccui.helper.seekWidgetByName(mainscene.node, "last_btn");
        last_btn.addClickEventListener(function(){
        });
        var play_pause_btn = ccui.helper.seekWidgetByName(mainscene.node,"play_btn");
        play_pause_btn.addClickEventListener(function(){
        })
        var next_btn = ccui.helper.seekWidgetByName(mainscene.node,"next_btn");
        next_btn.addClickEventListener(function(){
            this.m_boardView.nextCall();
        })
*/

        return true;
    },
    runAutoCmd:function(bRun){
        this.stopAllActions();
        var obj = this;
        if(bRun){
            var callback = function(){
                obj.updateAutoCmd();
                cc.log("updateAutoCmd");
            }
            var act = cc.RepeatForever.create(cc.sequence(cc.callFunc(callback),cc.delayTime(2)));
            obj.runAction(act);
        }
    },
    updateAutoCmd:function(){
        if(!this.m_boardView.playOrPauseCall()){
            this.runAutoCmd(false);
        }
    }


});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


