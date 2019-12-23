var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Common = Matter.Common,
    Events = Matter.Events;

// 创建引擎
var engine = Engine.create();

// 创建渲染器
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width: 400,
        height: 750,
        background: 'https://forever25.github.io/matter/image/bg.png'
    }
});

//绘制墙壁
var offset = 7;
var leftWall1 = Bodies.rectangle(offset, 12, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-rl.png',
        }
    }
});

var leftWall2 = Bodies.rectangle(offset, 658, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-rl.png',
        }
    }
});

var rightWall1 = Bodies.rectangle(393, 12, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-rl.png',
        }
    }
});

var rightWall2 = Bodies.rectangle(393, 658, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-rl.png',
        }
    }
});

var bottomWall1 = Bodies.rectangle(12, 744, 400, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-b.png',
        }
    }
});

var bottomWall3 = Bodies.rectangle(200, 744, 400, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-b.png',
        }
    }
});

var bottomWall4 = Bodies.rectangle(300, 744, 600, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-b.png',
        }
    }
});
var bottomWall5 = Bodies.rectangle(300, 744, 600, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-b.png',
        }
    }
});

var bottomWall2 = Bodies.rectangle(320, 744, 400, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-b.png',
        }
    }
});

var topLeftWall = Bodies.rectangle(60, 6, 120, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-t-l.png',
        }
    }
});

var topRightWall = Bodies.rectangle(340, 6, 120, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: 'https://forever25.github.io/matter/image/b-t-r.png',
        }
    }
});

// 生成Will,放入世界
World.add(engine.world, [leftWall1, leftWall2, rightWall1, rightWall2, bottomWall3,bottomWall4,bottomWall5, bottomWall1, bottomWall2,topLeftWall, topRightWall]);

// 运行引擎
Engine.run(engine);
Render.run(render);


var timeState = null;
function dropgift(src, color, info) {
    if (timeState == false) {
        return;
    }

    timeState = false;
    var image = new Image();
    image.src = src;
    image.onload = function (res) {
        var scale = (info.w + info.h) / (res.path[0].width + res.path[0].height);
        var w = info.w + 3,
            h = info.h + 3;
        var redio = info.h / 2 + 3;
        var paths = src.split('/');
        var fnName = paths[paths.length - 1].match(/\d\-(\w+)\.(png|jpg|gif)$/)[1];
        var n = 0;

        var itme = setInterval(() => {
            var x = Math.floor(Math.random() * (240 - 140 + 1) + 140);
            n++;
            if (n == info.num) {
                window.clearInterval(itme);
                timeState = true;
            }
            var obj = gengift({
                fnName,
                x,
                redio,
                color,
                w,
                h,
                scale,
                src
            });
            World.add(engine.world, obj);
            function addEnd(){
                gift_num+=1;
            }
            Events.off(engine.world);
            Events.on(engine.world,"afterAdd",addEnd);
        }, 200);
    };
}

function gengift(config) {
    var {
        fnName,
        x,
        redio,
        color,
        w,
        h,
        src,
        scale
    } = config;
    var username = createText({
        x,
        w,
        h,
        text: tf_name
    });

    var collisionGroup = -username.id;
    var option = {
        render: {
            sprite: {
                texture: src,
                xScale: scale,
                yScale: scale
            },
        },
        collisionFilter: {
            group: collisionGroup
        }
    };
    var boallWrap, boall;
    switch (fnName) {
        case 'circle':
            boallWrap = Bodies[fnName](x, -200, redio, {
                render: {
                    fillStyle: color,
                },
                restitutionNumber: 0.8,
                collisionFilter: {
                    group: collisionGroup
                }
            });
            boall = Bodies[fnName](x, -200, redio, option);
            break;
        case 'rectangle':
            boallWrap = Bodies[fnName](x, -200, w, h, {
                render: {
                    fillStyle: color,
                },
                restitutionNumber: 0.8,
                collisionFilter: {
                    group: collisionGroup
                }
            });
            boall = Bodies[fnName](x, -200, w, h, option);
            break;
        case 'polygon':
            boallWrap = Bodies[fnName](x, -200, 6, redio, {
                render: {
                    fillStyle: color,
                },
                restitutionNumber: 0.8,
                collisionFilter: {
                    group: collisionGroup
                }
            });
            boall = Bodies[fnName](x, -200, 6, redio, option);
            break;
    }
    var rotate = Constraint.create({
        bodyA: boallWrap,
        bodyB: boall,
        stiffness: 1,
        length: 0.5,
        render: {
            visible: false
        }
    });

    var textCon = Constraint.create({
        bodyA: boallWrap,
        bodyB: username,
        pointB: {
            x: 0,
            y: 120 * scale
        },
        stiffness: 1,
        length: 0.5,
        render: {
            visible: false
        }
    });

    var composite = Composite.create();
    Composite.setModified(composite, false, true, false);
    var composeBall = Composite.add(composite, [boallWrap, boall, username, rotate, textCon]);
    return composeBall;
}

function mainText(info) {
    var {
        size,
        text,
        color,
        strokColor
    } = info;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var username = text;
    var fontSize = size;
    canvas.height = fontSize;
    canvas.width = (fontSize - 10) * username.length + 10;

    ctx.lineWidth = 5;
    ctx.font = (fontSize - 10) + "px Forte";
    ctx.textBaseline = 'top';
    ctx.shadowBlur = 5;
    ctx.shadowColor = strokColor || '#f0bd32';
    ctx.strokeStyle = strokColor || '#f0bd32';
    ctx.strokeText(username, 5, 10);

    ctx.font = (fontSize - 10) + 'px Forte';
    ctx.textBaseline = 'top';
    ctx.fillStyle = color;
    ctx.fillText(username, 5, 10);

    return canvas;
}

function createText(sizeInfo) {
    var {
        x,
        h,
        text
    } = sizeInfo;
    var canvas = mainText({
        text,
        size: name_size,
        color: name_color
    });
    render.textures['customText'] = canvas;
    var nameBodies = Bodies.rectangle(x, -210 - (h / 2), canvas.width, canvas.height, {
        render: {
            sprite: {
                texture: 'customText'
            }
        }
    });

    nameBodies = Body.create({
        parts: [nameBodies],
        collisionFilter: {
            category: 0x0001,
            mask: 0x0002
        }
    });

    return nameBodies;
}

var imageSrc = ["https://forever25.github.io/matter/image/1-rectangle.png", "https://forever25.github.io/matter/image/2-polygon.png", "https://forever25.github.io/matter/image/3-circle.png"];
var boallColor = ['#7eb1d3', '#d0829a', '#8bb83d', '#8bb83d', '#e7a835'];



var price = 5; //价格过滤点
var gift_max = 20; //礼物一次性最多可以投的量，默认为20，最大为100
var full_number = 100; //满框礼物数量，最大5000，最小100，默认200
var name_size = 30; //粉丝名字颜色最小值10，最大值100，默认值25
var name_color = '#ffffff'; //粉丝名字颜色，默认值白色
var tks_word = 'THANK YOU'; //感谢词 最大长度不超过50
var tks_size = 50; //感谢文字大小 默认30
var tks_color = '#ffffff'; //感谢文字颜色
var tks_stroke = '#f0bd32';
var tf_name = '骨灰拌饭'; //粉丝名字
var gift_num = 1;
var moneySum = 0;

tks_color = '<%= tks_color %>';
tks_size = <%= tks_size %>;
tks_word = '<%= tks_word %>';
name_color = '<%= name_color %>';
name_size = <%= name_size %>;

price = <%= price %>;
gift_max = <%= gift_max %>;
full_number = <%= full_num %>;





// 生成dom结构
var canvasEl = render.canvas;
var divWrap = document.createElement('div');
var thankWrap = document.createElement('canvas');
var thankCtx = thankWrap.getContext('2d');
var userWrap = document.createElement('div');
var userBg = document.createElement('div');
var divChildbutton1 = document.createElement('button');

divWrap.style.position = 'relative';

divChildbutton1.innerText = '随机生成礼物';


$(thankWrap).addClass('roleStyle');
$(userBg).addClass('userBg');
$(userWrap).addClass('userWrap');

thankWrap.width = canvasEl.width;
thankWrap.height = canvasEl.height;
userWrap.style.width = canvasEl.width + 'px';
userWrap.style.height = canvasEl.height + 'px';

var thankText = mainText({
    size: tks_size,
    text: tks_word,
    color: tks_color,
    strokColor: tks_stroke
});
thankCtx.drawImage(thankText, thankText.width / 2 - thankWrap.width / 2, (thankWrap.height - thankText.height) / 2);

$(userBg).html(function(){
    return `<div class="username">${tf_name}</div>`;
});
userWrap.appendChild(userBg);
divWrap.appendChild(thankWrap);
divWrap.appendChild(canvasEl);
divWrap.appendChild(userWrap);

document.body.appendChild(divWrap);
document.body.appendChild(divChildbutton1);

var moneyNum;
userBg.addEventListener('animationend',function(){
    sendgift(moneyNum);
});

// 事件绑定
divChildbutton1.addEventListener('click', function () {
    moneyNum = Math.round(Math.random() * 100);
   if( moneyNum <= price) {
        return ;
   }

   $(thankWrap).addClass('fadeInAnimation');
   $(userBg).addClass('fadeInAnimation');
   moneySum += moneyNum;
   console.log(moneySum);

});

function sendgift(money) {
    $(thankWrap).removeClass('fadeInAnimation');
    $(userBg).removeClass('fadeInAnimation');

    if (money > (price + 40)) {
        dropgift(imageSrc[Math.round(Math.random() * 2)], Common.choose(boallColor), {
            w: 70,
            h: 70,
            num: 8
        });

    } else if (money > (price + 20)) {
        dropgift(imageSrc[Math.round(Math.random() * 2)], Common.choose(boallColor), {
            w: 50,
            h: 50,
            num: 4
        });

    } else if(money > price) {
        dropgift(imageSrc[Math.round(Math.random() * 2)], Common.choose(boallColor), {
            w: 40,
            h: 40,
            num: 2
        });

    }
    if (gift_num >= full_number) {
        gift_num = 0;
        World.clear(engine.world);
    }
}

Engine.run(engine);
Render.run(render);

zbmate.connect();