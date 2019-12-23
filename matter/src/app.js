import './css/app.css';
import Matter from "matter-js";
// import { workerData } from 'worker_threads';

// const Engine=matter.Engine,
//       Render=matter.Render,
//       World=matter.World,
//       Bodies=matter.Bodies,
//       Common=matter.Common,
//       Composites=matter.Composites;

// var engine=Engine.create();
// var render=Render.create({
//     element : document.body,
//     engine : engine,
//     options : {
//         width : 1000,
//         height : 800,
//         pixelRatio : 1,
//         wireframes: false, // 线框模式
//     }
// });

// let stack=Composites.stack(20, 20, 6, 4, 0, 0, function(x, y) {
//     if (Common.random() > 0.35) {
//         return Bodies.rectangle(x, y, 64, 64, {
//             render: {
//                 stroke: "#000",
//                 sprite: {
//                     texture: "./image/duilian.png"
//                 }
//             }
//         });
//     } else {
//         return Bodies.circle(x, y, 46, {
//             desity: 0.0005,
//             frictionAir: 0.06,
//             friction: 0.01,
//             render: {
//                 sprite: {
//                     texture: "./image/duilian.png"
//                 }
//             }
//         });
//     }
// });

// var boxA=Bodies.rectangle(100,200,80,80,{
//     render : {
//         sprite : {
//             texture : './image/duilian.png'
//         }
//     }
// });
// var boxB=Bodies.rectangle(300, 160, 80, 80);
// var circleC=Bodies.circle(300,100,25,25);
// var circleB=Bodies.circle(300,100,25,25);
// var circleW=Bodies.circle(300,100,25,25);
// var circleX=Bodies.circle(300,100,25,25);
// var ground = Bodies.rectangle(500, 600, 1000, 60, { isStatic: true });

// var newtonsCradle = Composites.newtonsCradle(300, 320, 5, 25, 150);

// World.add(engine.world, stack);
// Engine.run(engine);
// Render.run(render);
// 简写


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
        background: './image/bg.png'
    }
});



// 墙壁
var offset = 7;

let leftWall1 = Bodies.rectangle(offset, 12, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-rl.png',
        }
    }
});

let leftWall2 = Bodies.rectangle(offset, 658, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-rl.png',
        }
    }
});

let rightWall1 = Bodies.rectangle(393, 12, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-rl.png',
        }
    }
});

let rightWall2 = Bodies.rectangle(393, 658, 14, 750, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-rl.png',
        }
    }
});

let bottomWall1 = Bodies.rectangle(12, 744, 400, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-b.png',
        }
    }
});

let bottomWall2 = Bodies.rectangle(320, 744, 400, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-b.png',
        }
    }
});

let topLeftWall = Bodies.rectangle(60, 6, 120, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-t-l.png',
        }
    }
});

let topRightWall = Bodies.rectangle(340, 6, 120, 12, {
    isStatic: true,
    render: {
        sprite: {
            texture: './image/b-t-r.png',
        }
    }
});





// 生成Will
World.add(engine.world, [leftWall1, leftWall2, rightWall1, rightWall2, bottomWall1, bottomWall2, topLeftWall, topRightWall]);


// Bodies.rectangle(1570, -offset, 700 + 2 * offset, 50.5, { isStatic: true }),
// Bodies.rectangle(950, 1080 + offset, 1900.5 + 2 * offset, 50.5, { isStatic: true }),
// Bodies.rectangle(1900 + offset, 540, 50.5, 1080.5 + 2 * offset, { isStatic: true }),
// Bodies.rectangle(-offset, 540, 50.5, 1080.5 + 2 * offset, { isStatic: true })


// 鼠标约束
var mouseConstraint = MouseConstraint.create(engine, {
    element: render.canvas
});

World.add(engine.world, mouseConstraint);

// 运行引擎
Engine.run(engine);
Render.run(render);


// var stack = Composites.stack(20, 20, 6, 4, 0, 0, function(x, y) {
//     if (Common.random() > 0.35) {

//     } else {
//         return Bodies.rectangle(x, y, 50,50, {
//             desity: 0.0005,
//             frictionAir: 0.06,
//             friction: 0.01,
//             render: {
//                 sprite: {
//                     texture: "./image/box.png"
//                 }
//             }
//         });
//     }
// });

function dropgift(src, color) {
    let x = Math.floor(Math.random() * (280 - 120 + 1) + 120);
    let image = new Image();
    image.src = src;
    image.onload = function (res) {
        let scale = 0.5,
            wrapScale = 1.1;
        let w = res.path[0].width * scale,
            h = res.path[0].height * scale;
        let redio = Math.max(w, h) * scale;
        let paths = src.split('/');
        let fnName = paths[paths.length - 1].match(/\d\-(\w+)\.(png|jpg|gif)$/)[1];
        let option = {
            render: {
                sprite: {
                    texture: src,
                    xScale: scale,
                    yScale: scale
                },
            },
        }
        let boall, boallWrap;
        switch (fnName) {
            case 'circle':
                boallWrap = Bodies[fnName](x, -200, redio, {
                    render: {
                        fillStyle: color,
                    }
                });
                boall = Bodies[fnName](x, -200, redio, option);
                break;
            case 'rectangle':
                boallWrap = Bodies[fnName](x, -200, w, h, {
                    render: {
                        fillStyle: color,
                    }
                });
                boall = Bodies[fnName](x, -200, w, h, option);
                break;
            case 'polygon':
                boallWrap = Bodies[fnName](x, -200, 6, redio, {
                    render: {
                        fillStyle: color,
                    }
                });
                boall = Bodies[fnName](x, -200, 6, redio, option);
                break;

        }



        let composeBoall = Body.create({
            parts: [boallWrap, boall]
        });

        // Events.on(engine, "collisionStart", function (params){
        //     let deg=boallWrap.parent.angle*180/Math.PI;
        //     Body.rotate(composeBoall,deg);
        // })

        // Events.on(engine, "collisionActive", function (params){
        //     let deg=boallWrap.parent.angle*180/Math.PI;
        //     Body.rotate(composeBoall,deg);
        // })

        // Events.on(engine, "collisionEnd", function (params){
        //     let deg=boallWrap.parent.angle*180/Math.PI;
        //     Body.rotate(composeBoall,deg);
        // })

        // var rotate = Constraint.create({
        //     bodyA: boall,
        //     pointA: {
        //         x: 0,
        //         y: -80
        //     },
        //     bodyB: boallWrap,
        //     length: 0,
        //     stiffness: 0.9
        // });

        World.add(engine.world, composeBoall);

        setTimeout(() => {
            World.remove(engine.world, composeBoall);
        }, 2000);
    }
}



let imageSrc = ["./image/1-rectangle.png", "./image/2-polygon.png", "./image/3-circle.png"];
let boallColor = ['#7eb1d3', '#d0829a', '#8bb83d', '#8bb83d', '#e7a835']

setInterval(() => {
    dropgift(imageSrc[Math.round(Math.random() * 2)], boallColor[Math.round(Math.random() * 4)]);
}, 1000);





var renderOptions = render.options;
Engine.run(engine);
Render.run(render);